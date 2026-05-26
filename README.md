# Bombo 🍬 — Boutique de friandises artisanales

Site e-commerce moderne pour **Bombo**, avec identité visuelle rose bonbon / violet candy, programme fidélité, chatbot IA et espaces admin & gérant.

## Lancer le projet

```bash
npm install
npm run dev
```

Build production : `npm run build`

## Pages disponibles


| Page                                         | Accès                      |
| -------------------------------------------- | -------------------------- |
| Accueil                                      | Menu → Accueil             |
| Produits (filtres, grille/liste, pagination) | Menu → Produits            |
| Fiche produit                                | Clic sur une carte produit |
| Panier                                       | Icône panier               |
| À propos                                     | Menu → À propos            |
| Contact                                      | Menu → Contact             |
| Espace client                                | Mon compte / Wishlist      |
| Admin                                        | Profil → Espace Admin      |
| Gérant (chat)                                | Admin → Chat               |


## Design system (`src/app/components/design-system/`)

- `BomboButton` — primaire, secondaire, contour, danger
- `StarRating` — notation 1–5
- `LoyaltyBadge` — niveaux Caramel / Sucre / Chocolat / VIP
- `BomboInput` — champs avec états focus / erreur
- `ProductCardSkeleton` — chargement
- `AnimatedCounter` — compteur de points animé

## Micro-interactions

- Écran de chargement (logo + bonbons)
- Confetti + animation « bonbon vers le panier » à l’ajout
- Chatbot avec indicateur de frappe et mode gérant
- Filtres mobile en bottom sheet

