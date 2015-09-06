/* jshint browser:true */
(function() {
    //wait for the DOM to be loaded
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

        // create a new Sprite using an image
        var background = PIXI.Sprite.fromImage("background.jpg");
        
        background.width = width;
        background.height = height;
        
        stage.addChildAt(background, 0);
        
        var text = new PIXI.Text("STILL", {font: "30px Desyrel", align: "right", fill: "white"});
        
        //text.height = text.height/2;
        //text.width = text.width/2;
        
        
        text.x = width*3/7;
        text.y = height*2/5;
        
        //text.setStyle({font:"bold 50px Arial", fill""green"});
        
        stage.addChild(text);

        var lastFrame = (new Date()).getTime();
        
        function animate() {
            requestAnimFrame(animate);
            
            var actualFrame = (new Date()).getTime();
            
            var deltaT = actualFrame - lastFrame;
            
            //changes the text if it has passed certain amount of time
            if(deltaT > 100 ) {

                if(magnitude > 0 && magnitude <= 10.5) {
                    text.setText("STILL");
                    text.x = width*3/7;
                }
                else if(magnitude > 10.5 && magnitude <= 15) {
                    text.setText("MOVING AROUND");
                    text.x = width*1/5;
                }
                else if(magnitude > 15 && magnitude <= 45) {
                    text.setText("ACCELERATED");
                    text.x = width*1/4;
                }
                /*If there is a high accerations means that the velocity has changed
                //abruptly, as when it hits the ground*/
                else {
                    text.setText("CRASHED");
                    text.x = width*1/3;
                }
            lastFrame = actualFrame;
            }
            
            // render the stage
            renderer.render(stage);
        }
    }, false);

}());
