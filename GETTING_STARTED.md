# 🚀 Guide de Démarrage - Bômbô Admin Backend

## Installation Rapide

### 1️⃣ Installation Automatique (Windows)

Double-cliquez sur `setup.bat`:
```
setup.bat
```

### 2️⃣ Installation Automatique (Mac/Linux)

```bash
bash setup.sh
```

### 3️⃣ Installation Manuelle

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend (dans un autre terminal):**
```bash
npm install
npm run dev
```

## ✅ Vérification

Une fois démarrés, vérifiez:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001/api/health (devrait afficher `{"status":"ok"}`)

## 🔐 Authentification Admin

1. Essayez d'accéder à la page Admin (vous serez invité à vous connecter)
2. Entrez le mot de passe: **`bombo-admin`**
3. Vous êtes authentifié! Un JWT token (24h) est stocké

## 📊 Monitoring des Logs

Dans la page Admin, vous pouvez voir:
- Toutes les tentatives d'accès (réussies/échouées)
- Les IP d'accès
- Les erreurs du système

## 🔧 Configuration

### Variables d'environnement

**Frontend (`.env` ou `.env.local`):**
```env
VITE_API_URL=http://localhost:3001/api
VITE_ADMIN_ACCESS_KEY=bombo-secret-url
```

**Backend (`server/.env`):**
```env
PORT=3001
JWT_SECRET=votre-clé-secrète
ADMIN_PASSWORD=votre-mot-de-passe
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Déploiement

### Frontend sur Vercel

1. Poussez votre repo sur GitHub.
2. Créez un projet Vercel et sélectionnez ce repo.
3. Configurez :
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. Ajoutez les variables d'environnement Vercel :
   - `VITE_API_URL=https://<votre-backend>/api`
   - `VITE_ADMIN_ACCESS_KEY=ma-cle-secrete`
5. Déployez.

### Backend sur Railway

1. Créez un nouveau service Node.js dans Railway en pointant sur le dossier `server/`.
2. Ajoutez les variables d'environnement Railway :
   - `PORT=3001`
   - `JWT_SECRET=votre-cle-secrete`
   - `ADMIN_PASSWORD=votre-mot-de-passe`
   - `CORS_ORIGIN=https://<votre-frontend-vercel>`
3. Lancez le service.
4. Utilisez l'URL du service Railway comme valeur de `VITE_API_URL` dans Vercel.

### Astuce

- `VITE_` expose le paramètre au frontend, donc utilisez-le uniquement pour des URLs et des clés non sensibles.
- Ne stockez jamais de `JWT_SECRET` ou `ADMIN_PASSWORD` en clair dans votre repo.

## 🛡️ Sécurité

- ✅ URL admin masquée (pas de bouton visible)
- ✅ Authentification JWT (24h)
- ✅ Rate limiting (5 essais/15 min)
- ✅ Logging de tous les accès
- ✅ Protection contre les brute-force
- ✅ CORS configuré
- ✅ Validation des entrées

## 📚 Documentation Complète

- **Backend**: [server/README.md](./server/README.md)
- **Frontend**: [DOCUMENTATION.md](./DOCUMENTATION.md)

## 🆘 Problèmes Courants

### Port 3001 déjà utilisé
```bash
# Changez le port dans server/.env
PORT=3002
```

### CORS Error
Vérifiez que `CORS_ORIGIN` dans `server/.env` correspond à votre URL frontend

### Token expiré
Reconnectez-vous (24h de validité)

## 🎯 Prochaines Étapes

1. **Développement**: Modifiez les routes dans `server/routes/`
2. **Base de données**: Connectez une vraie DB (MongoDB, PostgreSQL)
3. **Sessions**: Passez à httpOnly cookies en production
4. **API**: Ajoutez d'autres endpoints admin (produits, clients, etc.)
5. **Monitoring**: Intégrez DataDog, Sentry ou New Relic

## 📞 Support

Pour plus d'informations, consultez les READMEs dans les dossiers `server/` et `DOCUMENTATION.md`.
