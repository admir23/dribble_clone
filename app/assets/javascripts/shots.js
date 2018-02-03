document.addEventListener("turbolinks:load", function (){

   var Shots = {
     previewShot(){
       if(window.File && window.FileList && window.FileReader) {
         function handleFileSelect(evt) {
           evt.stopPropagation();
           evt.preventDefault();

           let files = evt.target.files || evt.dataTransfer.files;
            //files is FileList of File objects. List properties here.
           for(var i = 0, f; f = files[i]; i++) {
             //only process image files
             if (!f.type.match('image.*')) {
                continue;
             }
             const reader = new FileReader();
             //closure to capture the file info

             reader.onload = (function(theFile){
               return function(e) {
                //render thumbnail
                let span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
               };
             })(f);
             reader.readAsDataURL(f);
            } 
          }  
         function handleDragOver(evt) {
           evt.stopPropagation();
           evt.preventDefault();
           evt.dataTransfer.dropEffect = 'copy';
         }
         
         const dropZone = document.getElementById('drop_zone');
         const target = document.documentElement;
         const fileInput = document.getElementById('shot_user_shot');
         const previewImage = document.getElementById('previewImage');
         const newShotForm = document.getElementById('new_shot');

         if(dropZone) {
           dropZone.addEventListener('dragover', handleDragOver, false);
           dropZone.addEventListener('drop', handleFileSelect, false);
         }

         dropZone.addEventListener('dragover', (e) => {
          dropZone.classList.add('fire');
         }, false);

         dropZone.addEventListener('dragleave', (e)=> {
          dropZone.classList.remove('fire');
         }, false);

         dropZone.addEventListener('drop', (e)=>{
          e.preventDefault();
          dropZone.classList.remove('fire');
          fileInput.files = e.dataTransfer.files;
          //if on shot/id/edit hide preview image on drop
          if(previewImage) {
            preview.Image.style.display = 'none';
          }
          if(newShotForm) {
            dropZone.style.display = 'none';
          }
         }, false);

         target.addEventListener('dragover', (e)=> {
          e.preventDefault();
          dropZone.classList.add('dragging');
         }, false);

         //remove dragging class to body when Not dragging
         target.addEventListener('dragleave', (e)=> {
          dropZone.classList.remove('dragging');
          dropZone.classList.remove('fire');
         },false);
       }
     }
   };
   Shots.previewShot();
});