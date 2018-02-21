$(document).ready(function() {
     
    
    /* mostrar temas */
    const añadirTemas = function(temas) {
           
      temas.forEach(function(tema) {
        const temita = tema.content;
        const id=tema.id;
        const autor = tema.author_name;
        const contadorRespuesta = tema.responses_count;
      
        $TodosLosTemasDiv.append(`<div class="tema-general card"><a  href="topicRespuesta.html?topic_id=${id}">
          <h3 class="card-title title">${temita}</a> </h3>
          <h4 class="resume"><span class="fa fa-user">${autor}.</span>
          <span class="fa fa-comments"></span>
          <span class="totalRespon card-text"> ${contadorRespuesta} respuestas</span></h4></div> 
    `);
      });
    };
  
    /* COINCIDENCIAS*/
    const temasDeBusqueda = function(temas) {
      let temasCoincidentes = temas.map((val) => val.content);
      $('#buscador').autocomplete({
        source: temasCoincidentes
      });
    };
  
    /* errores */
    const manejarError = function() {
      console.log('Se ha producido un error');  
    };
    /* VARIABLE GLOBAL DEL CONTENEDOR DONDE APARECERÁN TODOS LOS TEMAS SIN FILTRAR */
    const $TodosLosTemasDiv = $('#todos-los-temas');
  
    /* CONSEGUIR TODOS LOS TEMAS */
    $.ajax({
      url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics',
      // dataType: 'json',
      contentType: 'aplication/json'
    }).done(añadirTemas)
      .done(temasDeBusqueda)
      .fail(manejarError);
  
    $TodosLosTemasDiv.html('');
  
    /* CREAR UN TEMA NUEVO AL DAR CLIC EN GUARDAR */
    $('#guardar').click(function() {
      let nuevoAutor = $('#input-nombre').val();
      let nuevoTema = $('#input-mensaje').val();
      $.post('https://examen-laboratoria-sprint-5.herokuapp.com/topics',
        {
          author_name: nuevoAutor,
          content: nuevoTema
        },
        function(data, status) {
          $('#exampleModal').modal('hide');
          let firstChil = $('#todos-los-temas').eq(0);
          $(firstChil).prepend(` <h2 data-id=${data.id}>${data.author_name}</h2>  <h4><span class="totalRespon"> respuestas</span></h4>
        <p><a href="">${data.content}</a></p>`);         
          });
    });
    
    /*buscar por titulo*/
       $('#search').keyup(function() {
     var nombre = $.trim($(this).eq(0).val().toUpperCase());
      
      $('.title').hide();
      $('.resume').hide();
       
       $('.title').each(function() {
         var search =                   $.trim($(this).text().toUpperCase());
         if (search.indexOf(nombre) !== -1) {
           
           $(this).show();
           $(this).next().show();
               //   $(this).show();
                 
           }
     });
   });



  });