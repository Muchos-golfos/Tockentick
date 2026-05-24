#!/bin/bash

# ============================================================
#   TokenTick — Script de instalación automatizada
#   Instala: MySQL + Node.js + PM2 + Nginx + App completa
# ============================================================

# --- CONFIGURACIÓN — CAMBIA ESTOS VALORES ---
DB_USER="root"
DB_PASS="${DB_PASS:-TokenTick2024!}"  # Lee de variable de entorno o usa valor por defecto
DB_NAME="tokentick"               # Nombre de tu BD
SQL_FILE="./BBDD.sql"             # Tu archivo .sql
NODE_VERSION="18"
BACKEND_DIR="./Anteproyecto"      # Carpeta del backend
FRONTEND_DIR="./TokenTick"        # Carpeta del frontend React
BACKEND_PORT="3000"

echo ""
echo "=========================================="
echo "   TokenTick — Instalación automatizada"
echo "=========================================="
echo ""

# --- 1. ACTUALIZAR SISTEMA ---
echo "🔄 [1/7] Actualizando sistema..."
sudo apt-get update -y && sudo apt-get upgrade -y

# --- 2. INSTALAR MYSQL ---
echo "📦 [2/7] Instalando MySQL..."
if ! command -v mysql &> /dev/null; then
    sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $DB_PASS"
    sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $DB_PASS"
    sudo apt-get install -y mysql-server
    sudo systemctl start mysql
    sudo systemctl enable mysql
    echo "✅ MySQL instalado."
else
    echo "✅ MySQL ya instalado ($(mysql --version))"
fi

# Crear BD e importar SQL
echo "🗄️ Configurando base de datos '$DB_NAME'..."
sudo mysql -u"$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if [ -f "$SQL_FILE" ]; then
    sudo mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$SQL_FILE"
    echo "✅ Base de datos importada."
else
    echo "⚠️  Archivo $SQL_FILE no encontrado. Importa la BD manualmente."
fi

# --- 3. INSTALAR NODE.JS ---
echo "📦 [3/7] Instalando Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js instalado ($(node -v))"
else
    echo "✅ Node.js ya instalado ($(node -v))"
fi

# --- 4. INSTALAR PM2 ---
echo "📦 [4/7] Instalando PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    echo "✅ PM2 instalado."
else
    echo "✅ PM2 ya instalado."
fi

# --- 5. INSTALAR Y ARRANCAR BACKEND ---
echo "⚙️  [5/7] Configurando backend..."
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"

    # Crear .env si no existe
    if [ ! -f ".env" ]; then
        echo "📝 Creando .env del backend..."
        cat > .env << ENVEOF
PORT=$BACKEND_PORT
DB_HOST=localhost
DB_PORT=3306
DB_USER=$DB_USER
DB_PASS=$DB_PASS
DB_NAME=$DB_NAME
JWT_SECRET=tokentick_secret_$(date +%s)
FRONTEND_URL=http://$(hostname -I | awk '{print $1}')
ENVEOF
        echo "✅ .env creado. Edítalo si necesitas ajustar valores."
    else
        echo "✅ .env ya existe."
    fi

    npm install
    # Arrancar con PM2 — se reinicia solo si cae
    pm2 delete tokentick-backend 2>/dev/null
    pm2 start src/server.js --name "tokentick-backend"
    pm2 save
    sudo env PATH=$PATH:$(npm bin -g) pm2 startup systemd -u $(whoami) --hp $(eval echo ~$(whoami)) > /dev/null 2>&1 || true
    echo "✅ Backend arrancado con PM2."
    cd ..
else
    echo "❌ No se encontró la carpeta $BACKEND_DIR"
fi

# --- 6. BUILD DEL FRONTEND ---
echo "🎨 [6/7] Compilando frontend React..."
if [ -d "$FRONTEND_DIR" ]; then
    cd "$FRONTEND_DIR"

    # Crear .env del frontend con la IP del servidor
    SERVER_IP=$(hostname -I | awk '{print $1}')
    cat > .env << ENVEOF
VITE_API_BASE_URL=http://$SERVER_IP:$BACKEND_PORT/api
ENVEOF

    npm install
    npm run build
    echo "✅ Frontend compilado en $FRONTEND_DIR/dist"
    cd ..
else
    echo "❌ No se encontró la carpeta $FRONTEND_DIR"
fi

# --- 7. INSTALAR Y CONFIGURAR NGINX ---
echo "🌐 [7/7] Configurando Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt-get install -y nginx
fi

# Configuración Nginx — sirve React y hace proxy al backend
FRONTEND_PATH="$(pwd)/$FRONTEND_DIR/dist"
sudo tee /etc/nginx/sites-available/tokentick > /dev/null << NGINXEOF
server {
    listen 80;
    server_name _;

    # Frontend React
    root $FRONTEND_PATH;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy al backend Node.js
    location /api {
        proxy_pass http://localhost:$BACKEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Archivos subidos (imágenes de tickets)
    location /uploads {
        proxy_pass http://localhost:$BACKEND_PORT/uploads;
    }
}
NGINXEOF

sudo ln -sf /etc/nginx/sites-available/tokentick /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
sudo systemctl enable nginx

echo ""
echo "=========================================="
echo "   ✅ Instalación completada"
echo "=========================================="
SERVER_IP=$(hostname -I | awk '{print $1}')
echo ""
echo "  🌐 Frontend:  http://$SERVER_IP"
echo "  🔧 Backend:   http://$SERVER_IP/api"
echo "  📊 PM2:       pm2 status"
echo "  📋 Logs:      pm2 logs tokentick-backend"
echo ""
echo "  ⚠️  Revisa el archivo $BACKEND_DIR/.env"
echo "     y ajusta los valores si es necesario."
echo ""