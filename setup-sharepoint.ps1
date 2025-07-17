# ===========================================
# Script de Configuración de SharePoint
# SharePoint React App - Setup Script
# ===========================================

param(
    [Parameter(Mandatory=$true)]
    [string]$TenantUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$AdminEmail,
    
    [Parameter(Mandatory=$false)]
    [switch]$CreateLists = $true,
    
    [Parameter(Mandatory=$false)]
    [switch]$ConfigurePermissions = $true
)

# ===========================================
# FUNCIONES AUXILIARES
# ===========================================

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-Connection {
    try {
        Connect-PnPOnline -Url $TenantUrl -Interactive -ErrorAction Stop
        Write-ColorOutput "✅ Conexión exitosa a SharePoint Online" "Green"
        return $true
    }
    catch {
        Write-ColorOutput "❌ Error al conectar a SharePoint Online: $($_.Exception.Message)" "Red"
        return $false
    }
}

# ===========================================
# CONFIGURACIÓN INICIAL
# ===========================================

Write-ColorOutput "🚀 Iniciando configuración de SharePoint para React App" "Cyan"
Write-ColorOutput "==================================================" "Cyan"

# Verificar si PnP PowerShell está instalado
if (-not (Get-Module -ListAvailable -Name PnP.PowerShell)) {
    Write-ColorOutput "📦 Instalando PnP PowerShell..." "Yellow"
    Install-Module PnP.PowerShell -Force -AllowClobber
}

# Importar módulo
Import-Module PnP.PowerShell

# ===========================================
# CONECTAR A SHAREPOINT
# ===========================================

Write-ColorOutput "🔗 Conectando a SharePoint Online..." "Yellow"
if (-not (Test-Connection)) {
    exit 1
}

# ===========================================
# CREAR LISTAS NECESARIAS
# ===========================================

if ($CreateLists) {
    Write-ColorOutput "📋 Creando listas necesarias..." "Yellow"
    
    try {
        # Conectar al sitio específico
        Connect-PnPOnline -Url $SiteUrl -Interactive
        
        # Lista para el Mantenedor
        $listName = "MantenedorItems"
        
        # Verificar si la lista ya existe
        $existingList = Get-PnPList -Identity $listName -ErrorAction SilentlyContinue
        
        if (-not $existingList) {
            Write-ColorOutput "📝 Creando lista '$listName'..." "Yellow"
            
            # Crear la lista
            New-PnPList -Title $listName -Template GenericList -EnableVersioning
            
            # Agregar campos personalizados
            Write-ColorOutput "🔧 Agregando campos personalizados..." "Yellow"
            
            # Campo Nombre
            Add-PnPField -List $listName -DisplayName "Nombre" -InternalName "Nombre" -Type Text -AddToDefaultView -Required
            
            # Campo Descripción
            Add-PnPField -List $listName -DisplayName "Descripción" -InternalName "Descripcion" -Type Note -AddToDefaultView
            
            # Campo Categoría
            $categoryChoices = @("Desarrollo", "Marketing", "Ventas", "Soporte", "Administración")
            Add-PnPField -List $listName -DisplayName "Categoría" -InternalName "Categoria" -Type Choice -Choices $categoryChoices -AddToDefaultView -Required
            
            # Campo Estado
            $statusChoices = @("Activo", "Inactivo")
            Add-PnPField -List $listName -DisplayName "Estado" -InternalName "Estado" -Type Choice -Choices $statusChoices -AddToDefaultView -Required
            
            # Campo Fecha Creación
            Add-PnPField -List $listName -DisplayName "Fecha Creación" -InternalName "FechaCreacion" -Type DateTime -AddToDefaultView
            
            # Campo Fecha Modificación
            Add-PnPField -List $listName -DisplayName "Fecha Modificación" -InternalName "FechaModificacion" -Type DateTime -AddToDefaultView
            
            Write-ColorOutput "✅ Lista '$listName' creada exitosamente" "Green"
        }
        else {
            Write-ColorOutput "ℹ️ La lista '$listName' ya existe" "Blue"
        }
        
        # Crear lista de configuración
        $configListName = "AppConfig"
        $existingConfigList = Get-PnPList -Identity $configListName -ErrorAction SilentlyContinue
        
        if (-not $existingConfigList) {
            Write-ColorOutput "📝 Creando lista de configuración '$configListName'..." "Yellow"
            
            New-PnPList -Title $configListName -Template GenericList
            
            Add-PnPField -List $configListName -DisplayName "Clave" -InternalName "Clave" -Type Text -AddToDefaultView -Required
            Add-PnPField -List $configListName -DisplayName "Valor" -InternalName "Valor" -Type Text -AddToDefaultView -Required
            Add-PnPField -List $configListName -DisplayName "Descripción" -InternalName "Descripcion" -Type Note -AddToDefaultView
            
            Write-ColorOutput "✅ Lista de configuración creada exitosamente" "Green"
        }
        
    }
    catch {
        Write-ColorOutput "❌ Error al crear listas: $($_.Exception.Message)" "Red"
    }
}

# ===========================================
# CONFIGURAR PERMISOS
# ===========================================

if ($ConfigurePermissions) {
    Write-ColorOutput "🔐 Configurando permisos..." "Yellow"
    
    try {
        # Obtener grupos del sitio
        $visitorsGroup = Get-PnPGroup -Identity "Visitors" -ErrorAction SilentlyContinue
        $membersGroup = Get-PnPGroup -Identity "Members" -ErrorAction SilentlyContinue
        $ownersGroup = Get-PnPGroup -Identity "Owners" -ErrorAction SilentlyContinue
        
        if ($visitorsGroup) {
            Write-ColorOutput "👥 Configurando permisos para grupo Visitors..." "Yellow"
            Set-PnPListPermission -Identity $listName -User "Visitors" -AddRole "Read"
        }
        
        if ($membersGroup) {
            Write-ColorOutput "👥 Configurando permisos para grupo Members..." "Yellow"
            Set-PnPListPermission -Identity $listName -User "Members" -AddRole "Contribute"
        }
        
        if ($ownersGroup) {
            Write-ColorOutput "👥 Configurando permisos para grupo Owners..." "Yellow"
            Set-PnPListPermission -Identity $listName -User "Owners" -AddRole "Full Control"
        }
        
        Write-ColorOutput "✅ Permisos configurados exitosamente" "Green"
    }
    catch {
        Write-ColorOutput "❌ Error al configurar permisos: $($_.Exception.Message)" "Red"
    }
}

# ===========================================
# AGREGAR DATOS DE EJEMPLO
# ===========================================

Write-ColorOutput "📊 Agregando datos de ejemplo..." "Yellow"

try {
    # Datos de ejemplo para el mantenedor
    $sampleData = @(
        @{
            "Nombre" = "Proyecto A"
            "Descripcion" = "Descripción del proyecto A"
            "Categoria" = "Desarrollo"
            "Estado" = "Activo"
            "FechaCreacion" = (Get-Date).ToString("yyyy-MM-dd")
            "FechaModificacion" = (Get-Date).ToString("yyyy-MM-dd")
        },
        @{
            "Nombre" = "Proyecto B"
            "Descripcion" = "Descripción del proyecto B"
            "Categoria" = "Marketing"
            "Estado" = "Activo"
            "FechaCreacion" = (Get-Date).ToString("yyyy-MM-dd")
            "FechaModificacion" = (Get-Date).ToString("yyyy-MM-dd")
        },
        @{
            "Nombre" = "Proyecto C"
            "Descripcion" = "Descripción del proyecto C"
            "Categoria" = "Desarrollo"
            "Estado" = "Inactivo"
            "FechaCreacion" = (Get-Date).ToString("yyyy-MM-dd")
            "FechaModificacion" = (Get-Date).ToString("yyyy-MM-dd")
        }
    )
    
    foreach ($item in $sampleData) {
        Add-PnPListItem -List $listName -Values $item
    }
    
    Write-ColorOutput "✅ Datos de ejemplo agregados exitosamente" "Green"
}
catch {
    Write-ColorOutput "❌ Error al agregar datos de ejemplo: $($_.Exception.Message)" "Red"
}

# ===========================================
# CONFIGURACIÓN FINAL
# ===========================================

Write-ColorOutput "🎉 Configuración completada exitosamente!" "Green"
Write-ColorOutput "==================================================" "Cyan"
Write-ColorOutput "📋 Resumen de la configuración:" "Cyan"
Write-ColorOutput "   • Lista '$listName' creada y configurada" "White"
Write-ColorOutput "   • Lista '$configListName' creada" "White"
Write-ColorOutput "   • Permisos configurados" "White"
Write-ColorOutput "   • Datos de ejemplo agregados" "White"
Write-ColorOutput "" "White"
Write-ColorOutput "🔗 URL del sitio: $SiteUrl" "Yellow"
Write-ColorOutput "📝 Próximos pasos:" "Cyan"
Write-ColorOutput "   1. Configurar Azure AD App Registration" "White"
Write-ColorOutput "   2. Configurar variables de entorno" "White"
Write-ColorOutput "   3. Publicar la aplicación React" "White"
Write-ColorOutput "   4. Configurar SSO" "White"

# Desconectar
Disconnect-PnPOnline 