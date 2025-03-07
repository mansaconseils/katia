-- Création de la table pour stocker les propriétés immobilières
create table if not exists "public"."67beb8130dc403377ca266db_properties" (
  "id" uuid primary key default uuid_generate_v4(),
  "title" text not null,
  "description" text,
  "price" numeric not null,
  "type" text not null, -- villa, apartment, riad, etc.
  "status" text not null default 'available', -- available, sold, rented
  "bedrooms" integer,
  "bathrooms" integer,
  "area" numeric, -- en m²
  "land_area" numeric, -- en m² pour les terrains
  "year_built" integer,
  "address" text,
  "city" text not null,
  "district" text,
  "latitude" numeric,
  "longitude" numeric,
  "features" jsonb, -- piscine, jardin, parking, etc.
  "main_image" text, -- URL de l'image principale
  "images" jsonb, -- tableau d'URLs des images
  "video_url" text, -- URL de la visite virtuelle
  "highlighted" boolean default false, -- propriété mise en avant
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default now(),
  "user_id" uuid -- référence à l'utilisateur qui a créé l'annonce
);

-- Index pour optimiser les recherches
create index if not exists "idx_properties_type" on "public"."67beb8130dc403377ca266db_properties" ("type");
create index if not exists "idx_properties_city" on "public"."67beb8130dc403377ca266db_properties" ("city");
create index if not exists "idx_properties_price" on "public"."67beb8130dc403377ca266db_properties" ("price");
create index if not exists "idx_properties_bedrooms" on "public"."67beb8130dc403377ca266db_properties" ("bedrooms");
create index if not exists "idx_properties_area" on "public"."67beb8130dc403377ca266db_properties" ("area");
create index if not exists "idx_properties_highlighted" on "public"."67beb8130dc403377ca266db_properties" ("highlighted");

-- Table pour stocker les options de recherche (types de propriété, quartiers, etc.)
create table if not exists "public"."67beb8130dc403377ca266db_property_options" (
  "id" bigint generated by default as identity,
  "category" text not null, -- type, feature, city, district
  "value" text not null,
  "label_fr" text not null,
  "label_en" text,
  "label_ar" text,
  "active" boolean default true,
  
  primary key ("id"),
  unique ("category", "value")
);