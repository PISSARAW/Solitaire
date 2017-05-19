/**
 * Created by acer on 05/05/2017.
 */
console.log("Ce programme JS vient d'être chargé");


$(document).ready(function () {
    console.log("Le document est pret");
    var pos=18;
    var posDepartSouris;
    var posDepartBoite;
    var coups=0;
    var i=0;

    //Gestionnaire d'évenements
    $('button').click(function () {
        $('#arriere-plan, #solitaire').css("display","block");
        //var carte= $('.carte-canvas:first');
        paquet = shuffle(paquet);
        for (i=0; i<52; i++) {
            $('#paquet .placeholder').append(paquet[i]);
        }
        var j;
        //distribution des cartes dans le jeu
        for(i=8; i!==0; i--){
            for(j=0; j<i; j++){
                // carte.animate({left : 10}, {duration : 100});

                $('.carte-canvas:first').css('z-index', j);
                if(i!==0){
                    $('.carte-canvas:first').css('top', j*20);
                }
                $('#solitaire-plateau').find('.carte').eq(i-1).children('.placeholder').append($('.carte-canvas:first'));
                console.log(i-1);
            }
        }

        $('.carte-canvas').mousedown(function(event)
        {
            console.log("Le bouton de la souris a été appuyé sur la boite.");
            // Seulement le bouton gauche de la souris
            if(event.which!==1){return;}
            // Éviter de sélectionner texte si la souris bouge pendant le click
            event.preventDefault();
            var boite=$(this);
            $('.carte-canvas').removeClass('bouge');
            if(boite.parent().hasClass('deplacable'))
            {
                boite.addClass('bouge');
            }
            posDepartSouris={left:event.pageX, top: event.pageY};
            posDepartBoite =boite.offset();
            console.log($(this).parent());
        });



    });

    $('#solitaire-plateau .carte').each(function (index) {
        var image = index;
        image=getRandom(2,10);
        console.log( image + ": "); //+ $( this ).text()  );
        $(this).css("left", pos+"%");
        console.log($(this).children());
            pos = pos+8;
        $(this).children().children().css('position','absolute');
        $(this).children().addClass('deplacable');
    });



    $('.carte .carte-canvas, #lot .carte-canvas').mousedown(function(event)
    {
        console.log("Le bouton de la souris a été appuyé sur la boite.");
        // Seulement le bouton gauche de la souris
        if(event.which!==1){return;}
        // Éviter de sélectionner texte si la souris bouge pendant le click
        event.preventDefault();
        var boite=$(this);
        $('.carte-canvas').removeClass('bouge');
        boite.addClass('bouge');
        posDepartSouris={left:event.pageX, top: event.pageY};
        posDepartBoite =boite.offset();
    });

    function getRandom(min, max){
        min= Math.ceil(min);
        max=Math.floor(max);
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    console.log(getRandom(2,10));
    $('html').mouseup(function(e)
    {
        console.log("Le bouton de la souris a été relaché.");

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


     // tableau de carte
    var paquet= [];
    var lot;
    var n;
        for (lot = 1; lot < 14; lot++) {
            paquet[lot] = ('<img src="images/' + lot + '_of_spades.png" class="carte-canvas" style="position: absolute"/>');
            paquet[lot+14] = ('<img src="images/' + lot + '_of_clubs.png" class="carte-canvas" style="position: absolute"/>');
            paquet[lot+28] = ('<img src="images/' + lot + '_of_diamonds.png" class="carte-canvas" style="position: absolute"/>');
            paquet[lot+42] = ('<img src="images/' + lot + '_of_hearts.png" class="carte-canvas" style="position: absolute"/>');
        }
    //Brasser les carte: Code trouvé sur internet
    function shuffle(arr) {
        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }

    //Fermeture du jeu
    $('.fermer').mousedown(function () {
            $('#solitaire').fadeOut();
            $('#paquet .placeholder, #lot .placeholder').empty();
            //supprime les carte de leur emplacement pour une prochaine partie
            $('#solitaire-plateau .carte').each(function (index) {
                $('.placeholder').empty();
            });

            //$('#solitaire').css("display","none")
        }
    );

    $('.popup .niveau').mousedown(function (event) {
        $(this).parent().fadeOut();
        var cible = event.currentTarget;
        $('.popup .header').addClass(cible);
        console.log(cible);
    });

    //horloge du jeu
    function horloge(){
        var hms = new Date();
        var h, m, s;
        h = hms.getHours();
        m = hms.getMinutes();
        if (m<10) m = "0" + m;
        s = hms.getSeconds();
        if (s<10) s = "0" + s;
        $('#solitaire-tempus').html(h + ' : ' + m + ' : ' + s);
    }
    setInterval(horloge,1000);

    //Passage de carte du paquet au lot de carte
    $('.pile #paquet .placeholder:last-child').mousedown(function () {
        var carte= $('.carte-canvas:first');
        carte.animate({top: 10},{duration : 1000});
        console.log(carte);
        $('#lot .placeholder').append(carte);
        $('#solitaire-coup').text(coups+1);
    });
    console.log("La mise en place est finie. En attente d'événements...");
});
