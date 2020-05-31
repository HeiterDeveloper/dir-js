# dir-js
File manager written in JS and PHP

####  OBS: Update constants (DIRROOT, DIRFILES and DIRCACHE) in dir-js.php file.

## Requisites:
SimpleThumbPHP class (https://github.com/HeiterDeveloper/SimpleThumbPHP) to create thumbnails to image files.\
Jquery
## How to use:

```html
<script src="jquery-3.5.1.min.js"></script>
<link type="text/css" rel="stylesheet" href="dir-js.css">
<script src="dir-js.js"></script>

<input type="text" />

<script>
  $("input").dirJs({
  lockTypes: ['image/png', 'application/pdf']
  });
</script>
```

(https://www.heiterdeveloper.com/projetos/js/dir-js/prints/print1.png)<br/>
(https://www.heiterdeveloper.com/projetos/js/dir-js/prints/print2.png)
