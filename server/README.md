# Bômbô Admin Backend Server

Serveur Express pour l'authentification sécurisée de l'administrateur avec JWT, rate limiting et logging.

## 🚀 Installation

```bash
cd server
npm install
# ou
pnpm install
```

## ⚙️ Configuration

1. Créez un fichier `.env` dans le dossier `server/`:

```bash
cp .env.example .env
```

2. Éditez `.env` avec vos configurations:

```env
PORT=3001
JWT_SECRET=votre-clé-secrète-très-longue-et-aléatoire
ADMIN_PASSWORD=votre-mot-de-passe-admin
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
ALLOWED_IPS=   # Optional: comma-separated list of allowed IPs
```

## 🏃 Démarrage

### Mode développement (avec hot reload)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarrera sur `http://localhost:3001`

## 📚 Endpoints API

### Authentification

#### `POST /api/auth/login`

Authentification avec mot de passe.

**Request:**
```json
{
  "password": "votre-mot-de-passe-admin"
}
```

**Response (succès):**
```json
{
  "success": true,
  "message": "Authentification réussie",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": "24h"
}
```

**Response (erreur):**
```json
{
  "success": false,
  "error": "Mot de passe incorrect."
}
```

#### `POST /api/auth/verify`

Vérifier si un token est valide.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token valide"
}
```

### Admin (authentification requise)

#### `GET /api/admin/logs`

Récupérer les logs d'accès et d'erreurs (administrateur seulement).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessLogs": [
      "[2025-05-26T10:30:45.123Z] IP: 192.168.1.1 | Status: SUCCESS",
      "[2025-05-26T10:30:42.456Z] IP: 192.168.1.2 | Status: FAILED | Attempt: Invalid password"
    ],
    "errorLogs": [
      "[2025-05-26T10:25:33.789Z] Type: JWT_VERIFICATION_FAILED | Message: jwt expired | IP: 192.168.1.3"
    ],
    "timestamp": "2025-05-26T10:35:00.000Z"
  }
}
```

#### `GET /api/admin/status`

État du serveur admin (administrateur seulement).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "online",
    "uptime": 3600,
    "timestamp": "2025-05-26T10:35:00.000Z",
    "authenticatedAs": "admin"
  }
}
```

### Santé

#### `GET /api/health`

Vérifier que le serveur fonctionne.

**Response:**
```json
{
  "status": "ok",
  "environment": "development",
  "timestamp": "2025-05-26T10:35:00.000Z"
}
```

## 🔒 Sécurité

### Rate Limiting

- **Authentification**: Maximum 5 tentatives par IP toutes les 15 minutes
- **API générale**: Maximum 100 requêtes par minute par IP

Les requêtes dépassant les limites reçoivent une réponse 429 (Too Many Requests).

### JWT Token

- **Durée de validité**: 24 heures
- **Algorithme**: HS256
- **Stockage frontend**: localStorage (recommandé: httpOnly cookies en production)

### Logs

Les logs sont stockés dans le dossier `/logs/`:

- `admin-access.log`: Tentatives d'accès réussies et échouées
- `errors.log`: Erreurs système

**Format des logs:**
```
[ISO-TIMESTAMP] IP: IP-ADDRESS | Status: SUCCESS/FAILED | Additional info...
```

## 🔧 Architecture

```
server/
├── index.js                 # Serveur principal
├── middleware/
│   ├── auth.js             # Middleware JWT et génération de tokens
│   └── rateLimit.js        # Middleware rate limiting
├── routes/
│   ├── auth.js             # Routes d'authentification
│   └── admin.js            # Routes admin protégées
├── utils/
│   └── logger.js           # Système de logging
├── logs/                   # Dossier des logs (créé automatiquement)
├── package.json
├── .env.example            # Exemple de configuration
└── .env                    # Configuration (À créer)
```

## 📝 Exemple d'utilisation côté frontend

```typescript
import { useAdminAuth } from './utils/useAdminAuth';

function AdminLogin() {
  const { login, isLoading, error, isAuthenticated } = useAdminAuth();

  const handleLogin = async (password: string) => {
    const result = await login(password);
    if (result.success) {
      console.log('✅ Authentifié!');
    } else {
      console.error('❌', result.error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Vous êtes connecté en tant qu'administrateur</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(password); }}>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

## 🚨 Dépannage

### Le serveur ne démarre pas

```bash
# Vérifier que le port 3001 n'est pas utilisé
lsof -i :3001
# ou sur Windows
netstat -ano | findstr :3001
```

### Erreur "CORS"

Vérifiez que `CORS_ORIGIN` dans `.env` correspond à l'URL du frontend:

```env
CORS_ORIGIN=http://localhost:5173
```

### Token expiré

Les tokens expirent après 24h. L'utilisateur doit se reconnecter.

### Rate limit atteint

Attendez 15 minutes avant une nouvelle tentative, ou modifiez la configuration dans `middleware/rateLimit.js`.

## 🔄 Workflow de sécurité

```
1. Utilisateur entre le mot de passe
   ↓
2. Frontend envoie POST /api/auth/login
   ↓
3. Serveur vérifie le mot de passe et l'IP
   ↓
4. Si valide: génère JWT (24h), log succès
   Si invalide: log tentative échouée, rate limit
   ↓
5. Frontend stocke JWT dans localStorage
   ↓
6. Requêtes futures: inclure Authorization: Bearer JWT
   ↓
7. Serveur vérifie JWT sur chaque requête admin
   ↓
8. Tous les accès sont logés avec timestamp et IP
```

## 📊 Monitoring

Récupérez les logs via le dashboard admin:

```typescript
const logs = await adminAPI.getLogs(token);
console.log('Accès:', logs.accessLogs);
console.log('Erreurs:', logs.errorLogs);
```

## 📚 En production

1. ✅ Changez `JWT_SECRET` par une chaîne très longue et aléatoire
2. ✅ Changez `ADMIN_PASSWORD` 
3. ✅ Définissez `NODE_ENV=production`
4. ✅ Utilisez HTTPS (certificat SSL/TLS)
5. ✅ Configurez un reverse proxy (Nginx, Apache)
6. ✅ Stockez les logs sur un serveur sécurisé
7. ✅ Mettez en place une sauvegarde des logs
8. ✅ Utilisez httpOnly cookies au lieu de localStorage
9. ✅ Activez ALLOWED_IPS si nécessaire
10. ✅ Surveillez les tentatives échouées

## 📄 Licence

Propriété de Bômbô - Boutique de friandises artisanales
