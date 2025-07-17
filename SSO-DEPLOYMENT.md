# 🔐 Configuración SSO y Publicación - SharePoint React App

Esta guía detalla cómo configurar Single Sign-On (SSO) y publicar la aplicación React en SharePoint Online.

## 📋 Tabla de Contenidos

1. [Configuración de Azure AD](#configuración-de-azure-ad)
2. [Configuración de SharePoint](#configuración-de-sharepoint)
3. [Configuración de la Aplicación](#configuración-de-la-aplicación)
4. [Publicación en SharePoint](#publicación-en-sharepoint)
5. [Configuración de SSO](#configuración-de-sso)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🏢 Configuración de Azure AD

### 1. Registrar la Aplicación en Azure AD

1. **Acceder al Portal de Azure**:

   - Ve a [portal.azure.com](https://portal.azure.com)
   - Inicia sesión con tu cuenta de administrador

2. **Crear Registro de Aplicación**:

   ```
   Azure Active Directory → Registros de aplicaciones → Nueva aplicación
   ```

3. **Configurar la Aplicación**:
   ```json
   Nombre: "SharePoint React App"
   Tipo de cuenta: "Solo las cuentas de este directorio organizativo"
   URI de redirección: "https://your-tenant.sharepoint.com/_layouts/15/auth.aspx"
   ```

### 2. Configurar Permisos de API

1. **Agregar Permisos**:

   ```
   API permissions → Add a permission → Microsoft Graph
   ```

2. **Permisos Delegados Requeridos**:

   - `User.Read` - Leer perfil de usuario
   - `Sites.Read.All` - Leer sitios
   - `Files.Read.All` - Leer archivos
   - `Calendars.Read` - Leer calendarios

3. **Permisos de Aplicación** (si es necesario):
   - `Sites.FullControl.All` - Control total de sitios
   - `User.Read.All` - Leer todos los usuarios

### 3. Obtener Credenciales

1. **Client ID**:

   ```
   Overview → Application (client) ID
   ```

2. **Tenant ID**:

   ```
   Overview → Directory (tenant) ID
   ```

3. **Client Secret** (si es necesario):
   ```
   Certificates & secrets → New client secret
   ```

---

## 🏢 Configuración de SharePoint

### 1. Configurar el Sitio de SharePoint

1. **Crear Sitio de Aplicación**:

   ```
   SharePoint Admin Center → Sites → Active sites → Create
   ```

2. **Configurar Permisos**:

   ```
   Site permissions → Advanced permissions settings
   ```

3. **Crear Listas Necesarias**:
   ```powershell
   # Lista para el Mantenedor
   New-PnPList -Title "MantenedorItems" -Template GenericList
   Add-PnPField -List "MantenedorItems" -DisplayName "Nombre" -InternalName "Nombre" -Type Text -AddToDefaultView
   Add-PnPField -List "MantenedorItems" -DisplayName "Descripción" -InternalName "Descripcion" -Type Note -AddToDefaultView
   Add-PnPField -List "MantenedorItems" -DisplayName "Categoría" -InternalName "Categoria" -Type Choice -Choices "Desarrollo","Marketing","Ventas","Soporte","Administración" -AddToDefaultView
   Add-PnPField -List "MantenedorItems" -DisplayName "Estado" -InternalName "Estado" -Type Choice -Choices "Activo","Inactivo" -AddToDefaultView
   ```

### 2. Configurar App Catalog

1. **Crear App Catalog**:

   ```
   SharePoint Admin Center → More features → Apps → Open
   ```

2. **Configurar App Catalog**:
   ```
   App Catalog → Configure App Catalog
   ```

---

## ⚙️ Configuración de la Aplicación

### 1. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Azure AD Configuration
REACT_APP_CLIENT_ID=your-client-id-here
REACT_APP_TENANT_ID=your-tenant-id-here
REACT_APP_AUTHORITY=https://login.microsoftonline.com/your-tenant-id

# SharePoint Configuration
REACT_APP_SHAREPOINT_SITE_URL=https://your-tenant.sharepoint.com/sites/your-site
REACT_APP_SHAREPOINT_LIST_NAME=MantenedorItems

# Application Configuration
REACT_APP_REDIRECT_URI=https://your-tenant.sharepoint.com/_layouts/15/auth.aspx
REACT_APP_POST_LOGOUT_REDIRECT_URI=https://your-tenant.sharepoint.com
```

### 2. Configurar MSAL (Microsoft Authentication Library)

Instalar dependencias:

```bash
npm install @azure/msal-browser @azure/msal-react
```

### 3. Actualizar Componente de Login

```typescript
// src/components/Login.tsx
import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID!,
    authority: process.env.REACT_APP_AUTHORITY,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
```

### 4. Configurar PnP con Autenticación

```typescript
// src/services/sharepoint.ts
import { spfi } from "@pnp/sp";
import { graphfi } from "@pnp/graph";
import { SPFx as graphSPFx } from "@pnp/graph";
import { SPFx as spSPFx } from "@pnp/sp";

export const initializePnP = (context: any) => {
  const sp = spfi().using(spSPFx(context));
  const graph = graphfi().using(graphSPFx(context));

  return { sp, graph };
};
```

---

## 🚀 Publicación en SharePoint

### 1. Construir la Aplicación

```bash
# Instalar dependencias
npm install

# Construir para producción
npm run build
```

### 2. Crear Package de SharePoint

1. **Instalar SharePoint Framework**:

   ```bash
   npm install -g @microsoft/generator-sharepoint
   ```

2. **Crear Estructura SPFx**:

   ```bash
   yo @microsoft/sharepoint
   ```

3. **Configurar manifest.json**:
   ```json
   {
     "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json",
     "id": "sharepoint-react-app",
     "alias": "SharePointReactApp",
     "componentType": "WebPart",
     "version": "0.0.1",
     "manifestVersion": 2,
     "requiresCustomScript": false,
     "supportedHosts": ["SharePointWebPart"],
     "preconfiguredEntries": [
       {
         "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
         "group": { "default": "Other" },
         "title": { "default": "SharePoint React App" },
         "description": { "default": "Aplicación React para SharePoint" },
         "officeFabricIconFontName": "Page",
         "properties": {}
       }
     ]
   }
   ```

### 3. Empaquetar y Publicar

```bash
# Construir el paquete
gulp bundle --ship

# Empaquetar
gulp package-solution --ship

# El archivo .sppkg se genera en sharepoint/solution/
```

### 4. Subir al App Catalog

1. **Acceder al App Catalog**:

   ```
   https://your-tenant.sharepoint.com/sites/appcatalog
   ```

2. **Subir el Paquete**:

   ```
   Apps for SharePoint → Upload → Seleccionar .sppkg
   ```

3. **Activar la Aplicación**:
   ```
   Hacer clic en "Trust it" cuando se solicite
   ```

---

## 🔐 Configuración de SSO

### 1. Configurar Autenticación en SharePoint

1. **Configurar Azure AD como Proveedor de Identidad**:

   ```
   SharePoint Admin Center → Advanced → Authentication
   ```

2. **Habilitar SSO**:
   ```
   Enable Azure AD authentication
   ```

### 2. Configurar Permisos de Usuario

```powershell
# Conectar a SharePoint Online
Connect-PnPOnline -Url "https://your-tenant.sharepoint.com" -Interactive

# Agregar usuarios al sitio
Add-PnPUserToGroup -LoginName "user@your-tenant.com" -GroupName "Visitors"
```

### 3. Configurar Políticas de Acceso

1. **Configurar Condicional Access**:

   ```
   Azure AD → Security → Conditional Access → New policy
   ```

2. **Configurar MFA** (recomendado):
   ```
   Require MFA for SharePoint access
   ```

---

## 🛠️ Configuración Avanzada

### 1. Configurar CORS

```typescript
// En el servidor de SharePoint
// Configurar CORS para permitir requests desde la aplicación
```

### 2. Configurar Proxy para Desarrollo

```json
// package.json
{
  "proxy": "https://your-tenant.sharepoint.com"
}
```

### 3. Configurar Variables de Entorno por Entorno

```bash
# .env.development
REACT_APP_ENV=development
REACT_APP_SHAREPOINT_SITE_URL=https://your-tenant.sharepoint.com/sites/dev

# .env.production
REACT_APP_ENV=production
REACT_APP_SHAREPOINT_SITE_URL=https://your-tenant.sharepoint.com/sites/prod
```

---

## 🔧 Solución de Problemas

### Error: "AADSTS50011: The reply URL specified in the request does not match the reply URLs configured for the application"

**Solución**:

1. Verificar que el `redirectUri` en la aplicación coincida con el configurado en Azure AD
2. Asegurarse de que la URL no tenga trailing slash

### Error: "Access denied. You do not have permission to perform this action"

**Solución**:

1. Verificar permisos de usuario en SharePoint
2. Comprobar que la aplicación tenga los permisos necesarios en Azure AD
3. Verificar que el usuario esté en el grupo correcto

### Error: "The application was not found"

**Solución**:

1. Verificar que el `clientId` sea correcto
2. Comprobar que la aplicación esté registrada en el tenant correcto
3. Verificar que la aplicación esté habilitada

### Error: "CORS policy"

**Solución**:

1. Configurar CORS en SharePoint
2. Usar proxy en desarrollo
3. Verificar que las URLs sean correctas

---

## 📋 Checklist de Publicación

- [ ] Aplicación registrada en Azure AD
- [ ] Permisos configurados correctamente
- [ ] Variables de entorno configuradas
- [ ] Aplicación construida sin errores
- [ ] Paquete .sppkg generado
- [ ] Paquete subido al App Catalog
- [ ] Aplicación activada en el App Catalog
- [ ] SSO configurado y funcionando
- [ ] Usuarios tienen permisos correctos
- [ ] Aplicación probada en diferentes navegadores

---

## 📞 Soporte

Para problemas específicos:

1. **Logs de Azure AD**: Azure Portal → Azure Active Directory → Sign-ins
2. **Logs de SharePoint**: SharePoint Admin Center → Monitoring → Health
3. **Logs de la Aplicación**: Browser Developer Tools → Console

---

## 🔗 Enlaces Útiles

- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
- [SharePoint Framework Documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/)
- [Azure AD Authentication](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- [PnP PowerShell](https://pnp.github.io/powershell/)
- [SharePoint Online Management Shell](https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-online/connect-sharepoint-online)
