#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Bômbô Admin Backend - Complete Setup${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check if server folder exists
if [ ! -d "server" ]; then
    echo -e "${RED}❌ Erreur: dossier 'server' non trouvé${NC}"
    echo -e "${YELLOW}Assurez-vous de lancer ce script depuis la racine du projet${NC}"
    exit 1
fi

echo -e "${BLUE}1️⃣  Installation des dépendances du serveur...${NC}"
cd server

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json non trouvé dans le dossier server${NC}"
    exit 1
fi

# Install dependencies
if command -v pnpm &> /dev/null; then
    echo -e "${GREEN}📦 Utilisation de pnpm${NC}"
    pnpm install
elif command -v npm &> /dev/null; then
    echo -e "${GREEN}📦 Utilisation de npm${NC}"
    npm install
else
    echo -e "${RED}❌ Erreur: npm ou pnpm non trouvé${NC}"
    exit 1
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dépendances du serveur installées${NC}\n"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Création du fichier .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Fichier .env créé (utilisez les valeurs par défaut pour le dev)${NC}\n"
else
    echo -e "${GREEN}✅ Fichier .env trouvé${NC}\n"
fi

cd ..

echo -e "${BLUE}2️⃣  Installation des dépendances du frontend...${NC}"

# Install frontend dependencies
if command -v pnpm &> /dev/null; then
    echo -e "${GREEN}📦 Utilisation de pnpm${NC}"
    pnpm install
elif command -v npm &> /dev/null; then
    echo -e "${GREEN}📦 Utilisation de npm${NC}"
    npm install
else
    echo -e "${RED}❌ Erreur: npm ou pnpm non trouvé${NC}"
    exit 1
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors de l'installation des dépendances frontend${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dépendances du frontend installées${NC}\n"

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ Setup complet!${NC}"
echo -e "${BLUE}========================================${NC}\n"

echo -e "${YELLOW}🚀 Pour démarrer l'application:${NC}\n"

echo -e "${BLUE}Fenêtre 1 - Démarrer le serveur backend:${NC}"
echo -e "${GREEN}  cd server && npm run dev${NC}\n"

echo -e "${BLUE}Fenêtre 2 - Démarrer le frontend:${NC}"
echo -e "${GREEN}  npm run dev${NC}\n"

echo -e "${BLUE}Puis accédez à l'application:${NC}"
echo -e "${GREEN}  http://localhost:5173${NC}\n"

echo -e "${YELLOW}📝 Notes importantes:${NC}"
echo -e "  • Le serveur backend s'exécute sur http://localhost:3001"
echo -e "  • Le mot de passe admin par défaut est: ${GREEN}bombo-admin${NC}"
echo -e "  • Les logs sont sauvegardés dans server/logs/"
echo -e "  • Pour la production, changez JWT_SECRET dans server/.env\n"

echo -e "${BLUE}📚 Documentation:${NC}"
echo -e "  • Backend: server/README.md"
echo -e "  • Frontend: DOCUMENTATION.md\n"
