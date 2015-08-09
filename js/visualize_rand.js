

  function draw_rand_array(paper,ns,nc,fv,sw,dim,isorth,isdithered)
{
  var centr=dim/2;
  // Creates canvas
  //var paper = Raphael("raph", centr*2, centr*2);
  paper.canvas.style.backgroundColor = '#f1f09f';

  isrand=true;
  ra=0;
  rb=360;
  if (rb>ra)
  {
    var baseline=(rb-ra+0.0);
  }
  else
  {
    var baseline=(rb+360.0-ra);
  }

  var spacing=baseline/parseInt(nc);

  var loc=ra+baseline/(2*parseInt(nc));


  // Creates circle at x, y with radius rad
  //var circle = paper.circle(centr, centr, rad);
  // Sets the fill attribute of the circle to white
  //circle.attr("fill", "#a0ee90");


  //console.log("AN--------"+baseline+"--"+ra+"--"+rb);

  //var sradloc=sr*rad/100;
  //var scircle = paper.circle(centr, centr, sradloc);
  // Sets the fill attribute of the circle to white
  //scircle.attr("fill", "#afee00");

  for (i=0;i<nc;i++)
  {
    if (isrand)
    {
      console.log('Shuffled');
      var an=ra+baseline*Math.random();
      var dx=Math.random()*dim-dim/2;
      var dy=Math.random()*dim-dim/2;
    }
    else
    {

      var an=loc;
    }
    //console.log("AN:"+an+" i "+i);
    //Negative angle to be counter-clockwise
      draw_random_camera(paper,-an,ns,fv,sw,dim,isorth,isdithered,dx,dy);
      loc=loc+spacing;


  }

}



function draw_random_camera(paper,an,ns,fv,sw,dim,isorth,isdithered,dx,dy)
{
  var centr=dim/2;
  var r=rad;
  var a=Math.PI*fv/360;
  var tan_a=Math.tan(a);
  //var x=rad/tan_a;
  //var f=Math.sqrt(r*r+x*x)-r;

  var sradloc=0;
  var srad=0;
  var rad=1.41*dim; //1.41=Sqrt(2)
  if (isorth)
  {
    var h1=dim*sw/200;
    var h2=dim*sw/200;
    var raycolor="#000000";



    //Drawing the rectangle if OP
    var line1 = paper.path( ["M", centr+sradloc, centr+h1, "L", centr+rad, centr+h2 ] );
    var line2 = paper.path( ["M", centr+rad, centr-h1, "L", centr+sradloc, centr-h2 ] );
    var line3 = paper.path( ["M", centr+rad, centr+h1, "L", centr+rad, centr-h1 ] );

    var line4 = paper.path( ["M", centr+sradloc, centr+h2, "L", centr+sradloc, centr-h2 ] );
    line4.attr({"stroke":"#0000FF","stroke-width":3});
  }
  else
  {
    var frac=1-srad/100;
    var h1=frac*rad*tan_a;
    var raycolor="#FF00FF";

    //Drawing the triangle if NOP
    var line1 = paper.path( ["M", centr+sradloc, centr, "L", centr+rad, centr+h1 ] );
    var line2 = paper.path( ["M", centr+sradloc, centr, "L", centr+rad, centr-h1 ] );
    var line3 = paper.path( ["M", centr+rad, centr+h1, "L", centr+rad, centr-h1 ] );
    //line3.attr({"stroke":"#0000FF","stroke-width":3});
    //var line4 = paper.path( ["M", centr+srad, centr, "L", centr+rad, centr+h1 ] );
  }

  var q=2*h1/ns;

  var elements = paper.set();


  //var tri   = paper.path( ["M", centr+rad+f, centr, "L", centr+rad, centr+h1 , "L", centr+rad, centr-h1] );
  //tri.attr({"stroke-width": 0, fill: "yellow"});
  var holder=centr-h1;
  var holder2=centr-h2;

  //for (j=1;j<ns-1;j++)
  while (centr+h1-holder>q)
  {
    if (isdithered)
    {
      var rnd_jump=Math.log(1-Math.random())*(-q);
    }
    else
    {
      var rnd_jump=q;
    }
    holder=holder+rnd_jump;

    if (isorth)
    {
      holder2=holder2+rnd_jump*h2/h1;
      var line = paper.path( ["M", centr+sradloc, holder, "L", centr+rad, holder2 ] );
    }
    else
    {
      var line = paper.path( ["M", centr+sradloc, centr, "L", centr+rad, holder ] );
    }

    line.attr({"stroke":raycolor,"stroke-width":1});
    elements.push(line);

  }


  elements.push(line1);
  elements.push(line2);
  elements.push(line3);
  elements.push(line4);
  //elements.push(tri);

  elements.rotate(an,centr,centr) ; // deprecated
  elements.translate(dx,dy) ; // deprecated
}




  function DrawRotCam(paper,dim,rad)
{
  
    
  //$( "#raph" ).show( "scale",{percent:100} );

  var nc=$( "#nc" ).val();
  var ns=$( "#ns" ).val();
  var fv=$( "#fov" ).val();
  var sw=$( "#sw" ).val();
  var sr=$( "#sr" ).val();
  var ra=$( "#range-1a" ).val();
  var rb=$( "#range-1b" ).val();
  var ranges=$( "#cira" ).val().split(";");
  var ispara=$('input:radio[name=proj]:checked').val().trim().indexOf('-1')>-1;
  var isdithered=$('#dithered:checked').length>0;
  var isrand=$('#shuffled:checked').length>0;
  console.log('Here '+(isdithered)+'8');
  //window.alert('45');
  paper.clear();
  if (ispara)
  {
    $( "#fov" ).slider("disable");
    $( "#sw" ).slider("enable");

  }
  else{
    $( "#fov" ).slider("enable");
    $( "#sw" ).slider("disable");

  }

  draw_rand_array(paper,ns,nc,fv,sw,dim,ispara,isdithered);



}
