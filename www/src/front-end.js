/* jshint browser:true */
(function() {

    document.addEventListener('DOMContentLoaded', function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0xFFFFFF);

        // create a renderer instance
        var width = screen.availWidth;
        var height = screen.availHeight;
        var renderer = PIXI.autoDetectRenderer(width, height);

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimFrame(animate);

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("asset/bunny.png");

        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);
        
        var background = PIXI.Sprite.fromImage("background.jpg");
        
        background.width = width;
        background.height = height;
        
        stage.addChildAt(background, 0);
        
        /*

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // move the sprite to the center of the screen
        bunny.position.x = width / 2;
        bunny.position.y = height / 2;

        stage.addChild(bunny);*/

        function animate() {
            requestAnimFrame(animate);

            // just for fun, let's rotate mr rabbit a little
            //bunny.rotation += 0.1;

            // render the stage
            renderer.render(stage);
        }
    }, false);

}());
