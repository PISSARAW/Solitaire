/**
 * Created by acer on 05/05/2017.
 */
console.log("Ce programme JS vient d'être chargé");
$(document).ready(function () {
    console.log("Le document est pret");
    var pos=18;
    var posDepartSouris;
    var posDepartBoite;
    var i=0;

    /**$('#solitaire-plateau .carte').each(function (index) {
        var image = index;
        image=image+2;
        console.log( image + ": "); //+ $( this ).text()  );
        $(this).css("left", pos+"%");
        console.log($(this).children());
        $(this).children().add('<img src="images/4_of_clubs.png">');
        //$(this).css("background-image", "url(/images/"+ image + "_of_spades.png)");
            pos = pos+10;
    });**/



    $('.carte').mousedown(function(event)
    {
        console.log("Le bouton de la souris a été appuyé sur la boite.");
        // Seulement le bouton gauche de la souris
        if(event.which!==1){return;}
        // Éviter de sélectionner texte si la souris bouge pendant le click
        event.preventDefault();
        var boite=$(this);
        $('.carte').removeClass('bouge');
        boite.addClass('bouge');
        posDepartSouris={left:event.pageX, top: event.pageY};
        posDepartBoite =boite.offset();
    });

    $('html').mouseup(function(e)
    {
        console.log("Le bouton de la souris a été relaché.");

        if ($('.carte').offset()===$('.bouge').offset()){
            $('.bouge').offset($('.carte').offset());
        }
        $('.bouge').offset(posDepartBoite);
        $('.bouge').removeClass('bouge');
    });

    $('#solitaire-container').mousemove(function(event)
    {
        console.log("La souris à bougé dans la page");
        var boite=$('.bouge');
        // Si actuellement aucune boite n'est en mouvement, ignorer cet appel.
        if(boite.length===0){return;}
        var pos={left:event.pageX,
            top: event.pageY};
        pos.top -=posDepartSouris.top;
        pos.left-=posDepartSouris.left;
        pos.top +=posDepartBoite.top;
        pos.left+=posDepartBoite.left;
        boite.offset(pos);
    });










    $('.fermer').mousedown(function () {
            $('#solitaire').fadeOut();
            //$('#solitaire').css("display","none")
        }
    );

    $('.popup .niveau').mousedown(function (event) {
        $(this).parent().fadeOut();
        var cible = event.currentTarget;
        $('.popup .header').addClass(cible);
        console.log(cible);
    });

    $('button').click(function () {
        $('#arriere-plan, #solitaire').css("display","block");
        while(i<52){
            $('#gauche pile .placeholder ').add('<p>Lol</p>');
            i++;
        }
    });

    console.log("La mise en place est finie. En attente d'événements...");
});
