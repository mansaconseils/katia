import React, { useState, useEffect } from 'react';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'error', 'success'

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserSession(data.user);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUserSession(session?.user || null);
      if (session?.user) {
        fetchConversations();
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Charger les conversations depuis Supabase
  useEffect(() => {
    if (userSession) {
      fetchConversations();
    } else {
      // Utiliser le stockage local si non connecté
      const savedConversations = localStorage.getItem('chatHistory');
      if (savedConversations) {
        try {
          setConversations(JSON.parse(savedConversations));
        } catch (error) {
          console.error("Erreur lors du chargement de l'historique local:", error);
        }
      }
    }
  }, [userSession]);

  // Synchroniser la conversation actuelle
  useEffect(() => {
    if (messages.length > 0 && currentConversationId) {
      syncCurrentConversation();
    }
  }, [messages, currentConversationId]);

  const fetchConversations = async () => {
    if (!userSession) return;
    
    setIsLoadingConversations(true);
    try {
      // Récupérer les conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('67beb8130dc403377ca266db_chat_conversations')
        .select('*')
        .eq('user_id', userSession.id)
        .order('updated_at', { ascending: false });
      
      if (conversationsError) throw conversationsError;
      
      // Récupérer le premier message de chaque conversation pour l'aperçu
      const enrichedConversations = await Promise.all(
        conversationsData.map(async (conversation) => {
          const { data: messageData } = await supabase
            .from('67beb8130dc403377ca266db_chat_messages')
            .select('*')
            .eq('conversation_id', conversation.id)
            .order('timestamp', { ascending: true })
            .limit(1);
            
          return {
            ...conversation,
            preview: messageData?.[0]?.content || "Nouvelle conversation"
          };
        })
      );
      
      setConversations(enrichedConversations);
    } catch (error) {
      console.error("Erreur lors du chargement des conversations:", error);
    } finally {
      setIsLoadingConversations(false);
    }
  };

  const syncCurrentConversation = async () => {
    if (!userSession || !currentConversationId || messages.length === 0) return;
    
    setSyncStatus('syncing');
    try {
      // Vérifier si la conversation existe
      const { data: existingConversation } = await supabase
        .from('67beb8130dc403377ca266db_chat_conversations')
        .select('id')
        .eq('id', currentConversationId)
        .single();
      
      if (!existingConversation) {
        // La conversation n'existe pas encore, la créer
        const { data: newConversation, error } = await supabase
          .from('67beb8130dc403377ca266db_chat_conversations')
          .insert([
            { 
              id: currentConversationId, 
              user_id: userSession.id,
              title: messages[0]?.content.substring(0, 50) || 'Nouvelle conversation' 
            }
          ])
          .select()
          .single();
          
        if (error) throw error;
      }
      
      // Supprimer les messages existants pour cette conversation
      await supabase
        .from('67beb8130dc403377ca266db_chat_messages')
        .delete()
        .eq('conversation_id', currentConversationId);
        
      // Insérer les nouveaux messages
      const { error: insertError } = await supabase
        .from('67beb8130dc403377ca266db_chat_messages')
        .insert(
          messages.map(msg => ({
            conversation_id: currentConversationId,
            role: msg.role,
            content: msg.content
          }))
        );
        
      if (insertError) throw insertError;
      
      // Mettre à jour la date de la conversation
      await supabase
        .from('67beb8130dc403377ca266db_chat_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentConversationId);
      
      setSyncStatus('success');
      
      // Rafraîchir la liste des conversations
      fetchConversations();
    } catch (error) {
      console.error("Erreur lors de la synchronisation:", error);
      setSyncStatus('error');
    }
  };

  const loadConversation = async (conversation) => {
    setCurrentConversationId(conversation.id);
    
    try {
      setIsLoading(true);
      
      // Si l'utilisateur est connecté, charger depuis Supabase
      if (userSession) {
        const { data, error } = await supabase
          .from('67beb8130dc403377ca266db_chat_messages')
          .select('*')
          .eq('conversation_id', conversation.id)
          .order('timestamp', { ascending: true });
          
        if (error) throw error;
        
        setMessages(data.map(msg => ({
          role: msg.role,
          content: msg.content
        })));
      } else {
        // Sinon, utiliser les données locales
        const localConv = conversations.find(c => c.id === conversation.id);
        if (localConv?.messages) {
          setMessages(localConv.messages);
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la conversation:", error);
    } finally {
      setIsLoading(false);
      setShowHistory(false);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(crypto.randomUUID());
    setShowHistory(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Créer une nouvelle conversation si nécessaire
    if (!currentConversationId) {
      setCurrentConversationId(crypto.randomUUID());
    }

    setIsLoading(true);
    const userMessage = input.trim();
    setInput('');
    
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);

    try {
      const response = await fetch('https://api-hub-579483274893.us-central1.run.app/v1/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          inputs: {
            messages: [
              {
                role: "system",
                content: "Vous êtes un assistant immobilier professionnel et courtois, spécialisé dans l'immobilier de luxe à Marrakech. Répondez toujours en français de manière concise et précise."
              },
              ...updatedMessages
            ]
          }
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      console.error('Erreur:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarde locale pour les utilisateurs non connectés
  useEffect(() => {
    if (!userSession && currentConversationId && messages.length > 0) {
      const updatedConversations = [...conversations];
      const existingIndex = updatedConversations.findIndex(conv => conv.id === currentConversationId);
      
      const currentConversation = {
        id: currentConversationId,
        timestamp: new Date().toISOString(),
        messages,
        preview: messages[0]?.content.substring(0, 50) || "Nouvelle conversation"
      };

      if (existingIndex >= 0) {
        updatedConversations[existingIndex] = currentConversation;
      } else {
        updatedConversations.unshift(currentConversation);
      }

      setConversations(updatedConversations);
      localStorage.setItem('chatHistory', JSON.stringify(updatedConversations));
    }
  }, [messages, currentConversationId]);

  if (!isChatOpen) {
    return (
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Ouvrir le chat
      </motion.button>
    );
  }

  if (showHistory) {
    return (
      <motion.div 
        className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Historique des conversations</h3>
          <button
            onClick={() => setShowHistory(false)}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4">
          <button
            onClick={startNewConversation}
            className="w-full mb-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Nouvelle conversation
          </button>

          {isLoadingConversations ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : conversations.length > 0 ? (
            conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                onClick={() => loadConversation(conversation)}
                className="p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-50"
                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="text-sm text-gray-500 mb-2">
                  {formatRelative(new Date(conversation.timestamp || conversation.updated_at), new Date(), { locale: fr })}
                </div>
                <div className="text-gray-800 line-clamp-2">
                  {conversation.preview || "Conversation vide"}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">Aucune conversation trouvée</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Assistant KATIA</h3>
          {syncStatus === 'syncing' && (
            <span className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></span>
          )}
          {syncStatus === 'success' && (
            <span className="h-2 w-2 bg-green-400 rounded-full"></span>
          )}
          {syncStatus === 'error' && (
            <span className="h-2 w-2 bg-red-400 rounded-full"></span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHistory(true)}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            title="Historique"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            title="Minimiser"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="h-96 flex flex-col items-center justify-center text-center p-6">
          <div className="mb-6">
            <img 
              src="https://cdn.pixabay.com/video/2023/01/03/145154-786384369_medium.mp4" 
              alt="Database Chat History"
              className="w-32 h-32 mx-auto object-cover rounded-full mb-4"
            />
          </div>
          <h3 className="text-xl font-serif mb-3">Bienvenue sur l'Assistant KATIA</h3>
          <p className="text-gray-600 mb-4">
            Je peux vous aider à trouver la propriété parfaite à Marrakech ou répondre à vos questions sur l'immobilier de luxe.
          </p>
          <button
            onClick={() => setInput("Quelles sont les propriétés les plus exclusives à Marrakech ?")}
            className="px-4 py-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition-colors mb-2"
          >
            Propriétés exclusives à Marrakech ?
          </button>
          <button
            onClick={() => setInput("Qu'est-ce qui fait la valeur d'un riad ?")}
            className="px-4 py-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Qu'est-ce qui fait la valeur d'un riad ?
          </button>
        </div>
      ) : (
        <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-gray-100 ml-auto'
                    : 'bg-gray-900 text-white mr-auto'
                } max-w-[80%]`}
              >
                {msg.content}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                className="bg-gray-100 p-3 rounded-lg mr-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <motion.button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Envoyer
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AIAssistant;