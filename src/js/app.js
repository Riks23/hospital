// $(function () {
// 	$('#navigation li').hover(function () {
// 		$(this).children('ol').stop(false, true).fadeIn(800);
// 	}, function () {
// 		$(this).children('ol').stop(false, true).fadeOut(800);
// 	});
// });


$(document).ready(function(){

      $('#navigation li').hover(function () {
         clearTimeout($.data(this,'timer'));
         $('ol',this).stop(true,true).slideDown(100);
      }, function () {
        $.data(this,'timer', setTimeout($.proxy(function() {
          $('ol',this).stop(true,true).slideUp(100);
        }, this), 100));
      });
    });
// $(function () {
// 	var pull = $('#pull');
// 	menu = $('ol');
// 	menuHeight = menu.height();
// 	$(pull).on('click', function (e) {
// 		e.preventDefault();
// 		menu.slideToggle();
// 	});
// });

//ВАЛИДАЦИЯ ФОРМЫ ЗАПОЛНЕНИЯ.................................................................................//
"use strict"

document.addEventListener('DOMContentLoaded', function(){
    const form= document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error= formValidate(form);
        let formData=new FormData(form);
        formData.append('image', formImage.file[0]);

        if(error === 0){
            let response = await fetch('form.php',{
                method: 'POST' ,
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML= '';
                form.reset();  
            }
            else{
               alert("Ошибка");
            }
        }
        else{
            alert('Заполните обязательные поля');
        }
    }
    //Правильность заполнения ФИО
    function formValidate(form){
        let error=0;
        let formReq = document.querySelectorAll('._req');


        for(let index = 0; index<formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);
            // Отдельный класс для проверки почты НЕ РАББОТАЕТ!!!!!!!!!!
            if(input.classList.contains('_email'))
            {
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type")=== "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }
            else{
                if(input.value ===''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Видеть какую картинку загрузил
    const formImage = document.getElementById('formImage');

    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change',() => {
        uploadFile(formImage.files[0]);
    });
    //проверка формата фотки
    function uploadFile(file){
        if (!['image/jpeg','image/png'].includes(file.type)){
            alert('Допустимые разрешения.');
            formImage.value = '';
            return;
        }
        //Проверка размера фотки
        if(file.size>2 * 1024 * 1024){
            alert('Файл должен быть менее 2 МБ');
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            formPreview.innerHTML=`<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function(e){
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }
});