# Jardín adversarial

Mapa web interactivo para explorar las clasificaciones, sistemas e intersecciones del documento `Clasificaciones_`. Proyecto preparado para publicarse como **Adversarial Garden**.

El mapa usa cinco niveles de profundidad: **dominio → eje de clasificación → concepto o tecnología → método o familia de ataque → artefacto, implementación o recurso**. El deslizador lateral permite revelar cada capa progresivamente.

Incluye una rama de **Política y gobernanza** para relacionar vigilancia, privacidad, uso institucional, sistemas propietarios, activismo y regulación biométrica. Las fichas de métodos muestran el año de publicación o una referencia temporal explícita cuando está documentada; las categorías generales permanecen sin fecha para evitar atribuciones artificiales.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube `index.html`, `styles.css` y `app.js` a la raíz del repositorio.
3. En **Settings → Pages**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda. GitHub mostrará la URL pública cuando termine el despliegue.

No requiere instalación, compilación ni servidor. Para verlo localmente, abre `index.html` en un navegador.

## Editar contenido

Los nodos están al comienzo de `app.js`. Cada entrada usa este formato:

```js
N('id','Título','familia','Introducción',['etiqueta'],[['Fuente','https://...']])
```

Las relaciones se declaran debajo en `edgePairs` como pares de identificadores.
