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
        
        var text = new PIXI.Text("STILL", {font: "30px Desyrel", align: "right", fill: "#701e1e"});

        text.x = width*3/8;
        text.y = height*2/5;
        
        stage.addChild(text);

        var lastFrame = (new Date()).getTime();
        
        var transition = false;

        var newText = text.text;
        
        var lastText = text.text;
        
        var pos = text.x;
        
        var EPS = 0.00001;
        
        var incr = -0.125;
        
        //alert(text.tint);
        
        function animate() {
            requestAnimFrame(animate);
            
            var actualFrame = (new Date()).getTime();
            
            var deltaT = actualFrame - lastFrame;
            
            //text.tint = 16777215 - (magnitude - 8)*100; 
            
            //if the text has to be changed (a transition), fade the transition
            if(transition) {

                if(text.alpha >= 0) {
                    text.alpha += incr;
                    if(Math.abs(text.alpha) < EPS) {
                        //alert('gatoo');
                        text.setText(newText);
                        text.x = pos;
                        incr = -incr;
                        lastText = newText;
                    }
                    if(text.alpha == 1) {
                        transition = false;
                        incr = -incr;
                    }
                }
            }
            //changes the text if it has passed certain amount of time
            else if(deltaT > 150 ) {
                
                if(magnitude > 0 && magnitude <= 10.5 && newText != "STILL") {
                    transition = true;
                    newText = "STILL";
                    pos = width*3/8;
                }
                else if(magnitude > 10.5 && magnitude <= 15 && newText != "MOVING AROUND") {
                    transition = true;
                    newText = "MOVING AROUND";
                    pos = width*1/5;
                }
                else if(magnitude > 15 && magnitude <= 45 && newText != "ACCELERATED") {
                    transition = true;
                    newText = "ACCELERATED";
                    pos = width*1/4;    
                }
                /*If there is a high accerations means that the velocity has changed
                //abruptly, as when it hits the ground*/
                else if(magnitude > 45 && newText != "CRASHED") {
                    transition = true;
                    newText = "CRASHED";
                    pos = width*1/3;  
                }
            lastFrame = actualFrame;
            }
            
            // render the stage
            renderer.render(stage);
        }        
    }, false);

}());
