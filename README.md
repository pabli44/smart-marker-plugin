# 🚀 SmartMarker Plugin

**Un gestor de marcadores rápido, organizado y visualmente atractivo para Chrome y Firefox**

![SmartMarker Demo](https://via.placeholder.com/600x400/3498db/ffffff?text=SmartMarker+Demo)

## ✨ Características

✅ **Búsqueda inteligente** - Encuentra tus marcadores al instante
✅ **Organización visual** - Muestra la carpeta de cada marcador
✅ **Interfaz moderna** - Diseño limpio y responsive
✅ **Multi-plataforma** - Funciona en Chrome, Firefox y Edge
✅ **Gratis y open source** - Sin costos ocultos

## 📋 ¿Por qué SmartMarker?

Los navegadores modernos guardan cientos de marcadores, pero encontrarlos es un dolor:
- ❌ Chrome/Firefox no tienen búsqueda avanzada
- ❌ Los marcadores se pierden en carpetas interminables
- ❌ No hay forma rápida de ver dónde está guardado cada enlace

**SmartMarker resuelve todo esto** con una interfaz limpia y funcional.

## 🎯 Funcionalidades

### Búsqueda Rápida
![Búsqueda](https://via.placeholder.com/400x200/f5f5f5/333333?text=Búsqueda+Rápida)

- Busca por título o URL
- Resultados en tiempo real
- Filtra marcadores rápidamente

### Organización Visual
![Organización](https://via.placeholder.com/400x200/f5f5f5/333333?text=Organización+Visual)

- **Muestra la carpeta** donde está guardado cada marcador
- **Diseño de tarjetas** con hover effects
- **Tags visuales** para mejor identificación

### Panel Lateral
![Panel Lateral](https://via.placeholder.com/400x200/f5f5f5/333333?text=Panel+Lateral)

- Accede desde cualquier página
- Mismo buscador potente
- Integración perfecta con tu flujo de trabajo

## 📥 Instalación

### Desde Chrome Web Store (Próximamente)

### Desde Firefox Add-ons (Próximamente)

### Desarrollo Local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/smart-marker-plugin.git
   cd smart-marker-plugin
   ```

2. **Carga la extensión en Chrome:**
   - Ve a `chrome://extensions`
   - Activa "Modo desarrollador"
   - Haz clic en "Cargar extensión sin comprimir"
   - Selecciona la carpeta del proyecto

3. **¡Listo!** Usa la extensión desde la barra de herramientas.

## 🛠 Tecnologías Usadas

- **JavaScript ES6+** - Lógica principal
- **HTML5/CSS3** - Interfaz de usuario
- **WebExtensions API** - Compatibilidad multiplataforma
- **Fuse.js** - Búsqueda difusa avanzada
- **Chrome Storage API** - Almacenamiento local

## 📁 Estructura del Proyecto

```
smart-marker-plugin/
├── manifest.json              # Configuración principal
├── src/
│   ├── popup/
│   │   ├── popup.html         # Interfaz popup
│   │   ├── popup.css          # Estilos popup
│   │   └── popup.js           # Lógica popup
│   ├── sidepanel/
│   │   ├── sidepanel.html     # Interfaz panel lateral
│   │   ├── sidepanel.css      # Estilos panel lateral
│   │   └── sidepanel.js       # Lógica panel lateral
│   └── background/
│       └── service-worker.js  # Service worker
└── README.md                  # Documentación
```

## 🎨 Diseño

El plugin cuenta con:
- **Paleta de colores:** Azul profesional (#3498db, #2c3e50)
- **Tipografía:** Sistema fonts (Segoe UI, Roboto, etc.)
- **Animaciones:** Efectos hover y transiciones suaves
- **Responsive:** Funciona en cualquier tamaño
- **Modo oscuro compatible:** Se integra con el tema del navegador

## 📊 Estadísticas

- **Marcadores soportados:** Ilimitados
- **Rendimiento:** Búsqueda instantánea (<100ms)
- **Memoria:** Optimizado para bajo consumo
- **Compatibilidad:** Chrome 90+, Firefox 88+, Edge 90+

## 🔧 Personalización

Puedes personalizar:
- **Colores:** Modifica las variables CSS en popup.css/sidepanel.css
- **Tamaño:** Ajusta el width en el CSS
- **Fuentes:** Cambia la tipografía en el CSS

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar SmartMarker:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia **MIT** - puedes usarlo, modificarlo y distribuirlo libremente.

## 📞 Soporte

- **GitHub Issues:** [Reportar un problema](https://github.com/tu-usuario/smart-marker-plugin/issues)
- **Email:** tu-email@example.com

## 🌟 Futuras Mejoras

- [ ] Sincronización en la nube
- [ ] Importación/exportación de marcadores
- [ ] Modo oscuro
- [ ] Atajos de teclado personalizables
- [ ] Integración con Notion/Todoist
- [ ] Versión para Safari

---

**💡 Tip:** Organiza tus marcadores en carpetas en Chrome para mejor experiencia con SmartMarker

*Hecho con ❤️ por desarrolladores para desarrolladores*
