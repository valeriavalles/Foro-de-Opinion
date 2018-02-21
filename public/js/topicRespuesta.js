var topicId = getParameterByName('topic_id');
/* Imprimir el tema del respectivo topic id */
const obtenerTema = function() {
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}`,
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(añadirTema)
    .done(obtenerRespuestas)
    .fail(manejarError);
};

/* Imprimir el tema del id seleccionado */
const añadirTema = function(temas) {
  const temita = temas.content;
  const autor = temas.author_name;
  $('#create-respuesta').append(`<h2>${temita}</h2>  <br>        <p>por:</p><h2>${autor}</h2>`);  
};
// Obtiene las respuestas del topic id encontrado
const obtenerRespuestas = function() {
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(añadirRespuestas)
    .fail(manejarError);
};
/* Imprimir todas las respuestas de ese  topicid */
const añadirRespuestas = function(response) {
  if(response.error==="Aún no hay respuestas"){
    console.log(response.error);
  }else{
    response.forEach(function(resp) {
    const temarespuesta = resp.content;
    const authorespuesta = resp.author_name;
  $('.respuestas').append(`<h2>${temarespuesta}</h2><br><p>por:</p><h2>${authorespuesta}</h2><hr>`);  
})
  }
};
/* Función para manejar errores */
const manejarError = function() {
  console.log('Se ha producido un error');  
};
obtenerTema();
// ver respuestas 
$('#crearrespuesta').click(function() {
   let nuevoAutor = $('#author').val();
  let nuevoTema = $('#message').val();
  $.post(`https://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    {
      author_name: nuevoAutor,
      content: nuevoTema,
      topic_id: topicId
    },
    //  agrega los datos
    function(data, status) {
    let firstChil = $('.respuestas').eq(0);
    $(firstChil).prepend(`<h2>${data.content}</h2><br><p>por:</p><h2>${data.author_name}</h2><hr>`);     
    });
});