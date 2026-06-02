# 🍬 Bômbô — Boutique de Friandises Artisanales

## 📋 Table des matières

1. [Présentation générale](#présentation-générale)
2. [Pages principales](#pages-principales)
3. [Fonctionnalités utilisateur](#fonctionnalités-utilisateur)
4. [Espace administrateur](#espace-administrateur)
5. [Espace gérant](#espace-gérant)
6. [Design system](#design-system)
7. [Mode d'utilisation](#mode-dutilisation)
8. [Installation et lancement](#installation-et-lancement)

---

## 🎯 Présentation générale

**Bômbô** est une plateforme e-commerce moderne pour une boutique artisanale de friandises. L'application propose:

- ✨ **Identité visuelle unique** : Rose bonbon (#FF6B9D) + Violet candy (#A855F7)
- 🛒 **Panier persistant** : Ajouter/modifier/supprimer des articles
- ❤️ **Wishlist** : Sauvegarder vos produits favoris
- ⭐ **Programme fidélité** : 4 niveaux (Caramel, Sucre, Chocolat, VIP) avec accumulation de points
- 💬 **Chatbot IA** : Assistant produit + mode gérant pour transfert manuel
- 🔐 **Espace admin** : Gestion des produits, clients, commandes et statistiques
- 📱 **Responsive design** : Optimisé pour mobile, tablette et desktop
- 🎨 **Micro-interactions** : Animations fluides, confetti, loading screen personnalisée

---

## 📄 Pages principales

### 🏠 **Accueil** (`/home`)

Page d'atterrissage avec:
- **Section héro** : Présentation de la marque avec call-to-action
- **Catégories** : Accès rapide aux 5 catégories (Chocolats, Bonbons, Sucettes, Gâteaux, Coffrets)
- **Sélection de la semaine** : 4 produits vedettes avec notation et badges
- **Section « Notre histoire »** : Présentation de la boutique Bômbô
- **Statistiques** : Nombre de créations, clients, années d'expérience
- **Avis clients** : Témoignages avec avatars et notes
- **Newsletter** : Inscription aux offres exclusives

### 📦 **Produits** (`/products`)

Catalogue complet avec:
- **Filtres** : Par catégorie (mobile: bottom sheet)
- **Affichage** : Grille ou liste (toggle)
- **Pagination** : Navigation entre pages
- **Carte produit** : Image, nom, prix, notation, wishlist, bouton panier
- **Badges** : "Nouveau", "Promo", "Populaire"
- **Stock** : Indication si produit disponible

### 🔍 **Fiche produit** (`/product-detail`)

Détails complets:
- **Galerie d'images** : Image principale
- **Informations** : Nom, prix, catégorie, notation, nombre d'avis
- **Description** : Ingrédients, allergènes
- **Options** : Quantité sélectionnable
- **Actions** : Ajouter au panier, ajouter à la wishlist
- **Avis clients** : Affichage des commentaires avec notes
- **Produits similaires** : Suggestions de catégorie

### 🛒 **Panier** (`/cart`)

Gestion des achats:
- **Liste d'articles** : Avec image, prix unitaire, quantité modifiable
- **Sous-total dynamique** : Calcul automatique
- **Codes promo** : Champ de saisie (ex: `BOMBO10`, `BIENVENUE`)
- **Frais de port** : Gratuit dès 20 000 FCFA
- **Montant total** : Avec détail des réductions
- **Actions** : Continuer les achats, passer commande (bouton fictif)
- **Panier vide** : Message personnalisé si aucun article

### ℹ️ **À propos** (`/about`)

Historique et équipe:
- **Timeline** : 4 jalons clés (2019, 2021, 2022, 2025)
- **Statistiques** : Artisans, clients, créations par semaine
- **Équipe** : Présentation avec avatar, rôle et citation
- **Branding** : Logo Bômbô, slogan, ambiance générale

### 📞 **Contact** (`/contact`)

Coordonnées et formulaire:
- **Informations** :
  - 📍 Adresse boutique (lien Google Maps)
  - ☎️ Téléphone
  - 📧 Email
  - 🕐 Horaires
- **Formulaire** : Prénom, Nom, Email, Sujet, Message
- **Carte interactive** : Placeholder pour future intégration

### 👤 **Profil** (`/profile`)

Espace client avec sidebar:
- **Dashboard** :
  - Points actuels avec progression vers niveau suivant
  - Niveau fidélité actuel (avec badge et couleur)
  - Avantages du niveau
  - Historique récent des points

- **Mes commandes** : Liste des commandes avec statut (Livré, En cours, Préparation, Annulé)
- **Mes points** : Détail de l'accumulation et des dépenses de points
- **Wishlist** : Grille de produits sauvegardés
- **Mes adresses** : Gestion des adresses de livraison (bientôt)
- **Paramètres** : Préférences utilisateur (bientôt)
- **Actions** : Accès à l'espace admin (authentification requise)

### 🔐 **Admin** (`/admin`)

Tableau de bord administrateur (accès protégé par mot de passe):

#### Dashboard
- **KPIs** : Revenus du jour, commandes en cours, nouveaux clients, points distribués
- **Graphique ventes** : 7 derniers jours (Recharts)
- **Clients fréquents** : Top 5 avec niveau fidélité
- **Commandes récentes** : Dernières 5 avec statuts

#### Produits
- **Tableau** : Tous les produits avec photo, catégorie, prix, stock, statut
- **Actions** : Éditer, supprimer
- **Formulaire ajout** : Nom, description, prix, stock, catégorie, photo, allergènes
- **Bottom drawer** : Création/édition produits

#### Clients
- **Tableau** : Tous les clients avec email, commandes, points, niveau, date dernière commande
- **Inactifs** : Marquage des clients inactifs 60+ jours
- **Actions** : Voir, contacter, gérer points

#### Sections en cours de développement
- Commandes
- Fidélité
- Chat
- Paramètres

### 💬 **Gérant** (`/manager`)

Espace de chat avec les clients:
- **Interface chat** : Messages bidirectionnels
- **Mode gérant** : Les administrateurs peuvent reprendre les conversations du chatbot
- **Historique** : Conversation persistante
- **Indicateur de frappe** : Affichage dynamique

---

## 👥 Fonctionnalités utilisateur

### 🛍️ **Panier**
- Ajout/suppression d'articles
- Modification des quantités
- Codes promo appliqués
- Persistance via état React (local à la session)
- Animation confetti lors de l'ajout

### ❤️ **Wishlist**
- Ajouter/retirer des produits
- Accès depuis chaque carte produit ou fiche détail
- Affichage dans la barre d'en-tête (compteur)
- Section "Wishlist" dans le profil
- Cœur rempli sur les produits sauvegardés

### ⭐ **Programme fidélité**
4 niveaux progressifs:
- **Caramel** (0–999 pts) : Couleur dorée #D4A017
- **Sucre** (1 000–4 999 pts) : Rose #FF6B9D
- **Chocolat** (5 000–9 999 pts) : Marron #6B3A2A
- **VIP** (10 000+ pts) : Violet #A855F7

Fonctionnalités:
- Accumulation de points par achat
- Barre de progression vers le niveau suivant
- Avantages associés (réductions, cadeaux, priorité)
- Affichage du badge dans le profil et sur le profil admin

### 💬 **Chatbot**
- Réponses automatiques aux questions courantes
- Transfert manuel vers le gérant
- Indicateur de frappe
- Historique de conversation visible

---

## 🔐 Espace administrateur

**Authentification :** Mot de passe `bombo-admin` (modal sécurisé)

### Accès
1. Allez sur votre **Profil**
2. Cliquez sur **Espace Admin**
3. Entrez le mot de passe : `bombo-admin`
4. Validation → Redirection vers l'admin

### Fonctionnalités

#### Dashboard
- Vue d'ensemble des KPIs
- Graphique des ventes sur 7 jours
- Top 5 clients par fréquence
- Dernières commandes avec statuts

#### Gestion produits
- Tableau de tous les produits
- Colonnes : Photo, Nom, Catégorie, Prix, Stock, Statut, Actions
- Édition en ligne via drawer
- Champs : Nom, Description, Prix, Stock, Catégorie, Photo, Allergènes
- Upload photo (UI placeholder)

#### Gestion clients
- Tableau complet des clients
- Colonnes : Avatar, Nom, Email, Commandes, Points, Niveau, Dernière commande
- Inactifs 60+ jours marqués en rouge
- Actions : Voir, Contacter, Gérer points

#### Sections à développer
- Commandes (gestion des statuts)
- Fidélité (création de campagnes de points)
- Chat (modération et transferts du chatbot)
- Paramètres (configuration globale)

---

## 💬 Espace gérant

Accès depuis **Admin → Chat**

- Réception des conversations du chatbot
- Vue des messages clients
- Possibilité de répondre directement
- Marque "Gérant" sur les messages
- Historique persistant par conversation

---

## 🎨 Design system

### Composants réutilisables

| Composant | Localisation | Usage |
|-----------|--------------|-------|
| `BomboButton` | `design-system/` | Bouton primaire/secondaire/contour/danger |
| `BomboInput` | `design-system/` | Champs de saisie avec états |
| `StarRating` | `design-system/` | Notation 1–5 étoiles |
| `LoyaltyBadge` | `design-system/` | Badge niveaux fidélité |
| `ProductCard` | `components/` | Carte produit avec actions |
| `ProductCardSkeleton` | `design-system/` | État de chargement |
| `AnimatedCounter` | `design-system/` | Compteur de points animé |
| `Header` | `components/` | En-tête sticky avec nav, panier, wishlist |
| `Footer` | `components/` | Pied de page avec liens rapides, contact |
| `ChatBot` | `components/` | Widget chat flottant |
| `AdminAuthModal` | `components/` | Modal d'authentification admin |
| `LoadingScreen` | `components/` | Écran de démarrage avec logo + animation |

### Couleurs principales
- **Rose primaire** : #FF6B9D
- **Violet secondaire** : #A855F7
- **Jaune accent** : #FFD93D
- **Marron texte** : #3D1C02
- **Marron clair** : #8B6355
- **Crème fond** : #FFF8F0

### Typographies
- **Pacifico** : Logo, titres grand format
- **Baloo 2** : Titres, héros, accents
- **Poppins** : Corps, ui, labels

---

## 📱 Mode d'utilisation

### Pour les clients

#### 1. **Parcourir les produits**
   - Accueil → Voir les produits vedettes
   - Ou Menu → Produits pour le catalogue complet
   - Utilisez les filtres (catégorie) sur mobile/desktop

#### 2. **Ajouter au panier**
   - Cliquez sur **"Ajouter au panier"** sur la carte ou la fiche produit
   - Modifiez la quantité si nécessaire
   - Confirmez → Animation confetti + toast

#### 3. **Sauvegarder en wishlist**
   - Cliquez sur le ❤️ sur une carte ou dans la fiche produit
   - Accédez-y via **Profil → Wishlist**

#### 4. **Gérer votre panier**
   - Icône panier (en-tête) → Affiche le nombre d'articles
   - Cliquez pour accéder au panier complet
   - Modifiez quantités, appliquez des codes promo
   - Voir le total avec réductions

#### 5. **Consulter votre profil**
   - **Mon compte** (en-tête) → Profil
   - Onglets : Dashboard, Commandes, Points, Wishlist, Adresses, Paramètres
   - Consultez votre progression fidélité

#### 6. **Accumulation de points**
   - Achetez des produits → Points attribués
   - Plus vous achetez, plus vos points montent
   - Progressez entre les niveaux : Caramel → Sucre → Chocolat → VIP
   - Déblocage d'avantages exclusifs à chaque niveau

#### 7. **Utiliser le chatbot**
   - Icône chat (en bas à droite)
   - Posez une question sur les produits, allergènes, commandes
   - Si l'assistant ne peut pas répondre, demandez un transfert au gérant

#### 8. **Consulter les avis**
   - Sur chaque fiche produit, consultez les avis clients avec notes
   - Les produits populaires ont plus d'avis

### Pour les administrateurs

#### 1. **Accéder à l'espace admin**
   - lien d'acces à la page admin http://localhost:5173/?access_key=bombo-secret-url
   - Allez sur votre **Profil**
   - Cliquez sur **Espace Admin**
   - Entrez le mot de passe : `bombo-admin`

#### 2. **Consulter le dashboard**
   - Vue d'ensemble des KPIs (revenus, commandes, clients, points)
   - Graphique des ventes (7 derniers jours)
   - Top clients et commandes récentes

#### 3. **Gérer les produits**
   - Section **Produits** : Tableau de tous les articles
   - **Modifier** : Cliquez l'icône crayon → Drawer d'édition
   - **Créer** : Bouton **+ Ajouter un produit**
   - **Supprimer** : Icône poubelle (non fonctionnel en démo)

#### 4. **Gérer les clients**
   - Section **Clients** : Tableau avec toutes les infos
   - Identifiez les clients inactifs (60+ jours)
   - **Voir**, **Contacter** (email), **Gérer points** : Actions disponibles

#### 5. **Vérifier les commandes** (en développement)
   - Section **Commandes** : Prochainement

#### 6. **Modérer le chat**
   - Allez dans **Admin** → Bouton **Espace Gérant**
   - Accédez au chat manager
   - Lisez et répondez aux demandes clients

---

## 🚀 Installation et lancement

### Prérequis
- **Node.js** ≥ 18
- **npm** ou **pnpm**

### Installation

```bash
# Cloner ou extraire le projet
cd Bomno_Site

# Installer les dépendances
npm install
# ou
pnpm install
```

### Lancement en développement

```bash
npm run dev
# ou
pnpm dev
```

Le serveur démarre à `http://localhost:5173/`

### Build production

```bash
npm run build
# ou
pnpm build
```

Les fichiers optimisés sont générés dans le dossier `dist/`.

---

## 🎭 Micro-interactions et animations

### Écran de chargement
- **Logo Bômbô** animé au centre
- **Bonbons tournants** autour du logo
- Disparition progressive avant affichage du contenu
- Durée : ~1.8 secondes

### Ajout au panier
- **Toast notification** (haut droit) : "Article ajouté au panier !"
- **Animation confetti** (optionnel)
- **Compteur panier** mis à jour en direct

### Navigation
- **Scroll to top** automatique quand on change de page
- **Active states** sur les liens de navigation

### Chat
- **Indicateur de frappe** : "L'assistant écrit..."
- **Scroll auto** vers le dernier message

### Filtres
- **Bottom sheet** sur mobile (vs sidebar desktop)
- **Transitions fluides** entre affichages

### Wishlist
- **Cœur animé** au survol/clic
- **Toast** : "Ajouté à votre wishlist"
- **Badge** avec nombre d'articles

---

## 📊 Gestion d'état

### État local (React)
- **Panier** : Articles et quantités
- **Wishlist** : IDs des produits sauvegardés
- **Page actuelle** : Navigation
- **Profil** : Section active (dashboard, commandes, etc.)
- **Auth admin** : Sauvegardé dans `localStorage`

### Données statiques
- **Produits** : `src/app/data.ts` (PRODUCTS)
- **Clients** : `src/app/data.ts` (CUSTOMERS)
- **Ventes** : `src/app/data.ts` (SALES_DATA)
- **Avis** : `src/app/data.ts` (REVIEWS)

---

## 🔒 Sécurité

### Authentification admin
- Mot de passe stocké en dur : `bombo-admin` (pour démo)
- Sauvegarde dans `localStorage` sous clé `bombo_admin`
- Validation côté client (à améliorer pour production)
- Modal avec champ masquable

### À améliorer
- Backend JWT pour l'authentification
- Hachage des mots de passe
- Gestion des sessions
- Rate limiting sur les actions admin

---

## 📝 Notes de développement

- **Framework** : React 18 + TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : Shadcn/ui (accents, modals, etc.)
- **Graphiques** : Recharts
- **Icônes** : Lucide React
- **Toasts** : Sonner
- **Bundler** : Vite

### Fichiers clés
- `src/app/App.tsx` : Routage et logique globale
- `src/app/components/` : Composants réutilisables
- `src/app/pages/` : Pages principales
- `src/app/design-system/` : Composants du design system
- `src/app/data.ts` : Données statiques

---

## 🎯 Fonctionnalités futures

- [ ] Backend e-commerce (panier persistant, commandes réelles)
- [ ] Paiement intégré (Stripe, PayPal)
- [ ] Authentification utilisateur complète
- [ ] Gestion des adresses et livraisons
- [ ] Notifications email
- [ ] Avis clients authentifiés
- [ ] Recommandations personnalisées (ML)
- [ ] Multi-langue (FR, EN)
- [ ] PWA (offline mode)

---

## 📧 Contact et support

Pour toute question sur Bômbô :
- 📧 **Email** : bonjour@bombo.fr
- 📞 **Téléphone** : 01 23 45 67 89
- 🏪 **Boutique** : [Voir sur Google Maps](https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiI5ZqAwsyUAxUAAAAAHQAAAAAQQg..i&sca_esv=525e608177515078&pvq=OhYweDA6MHhkNzczOTU5YjU5YTNlMDRk&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=bf&sa=X&ftid=0xe2ebf2e1ad1878d:0xd773959b59a3e04d)
- 🕐 **Horaires** : Lun–Ven 9h–18h · Sam 10h–16h

---

**© 2025 Bômbô — Tous droits réservés**
