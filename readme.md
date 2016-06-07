# Hamster Wheel

> Infinite Page Scrolling jQuery Plugin


## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/PolarNotion/hamsterwheel/master/dist/jquery.hamster-wheel.min.js
[max]: https://raw.githubusercontent.com/PolarNotion/hamsterwheel/master/dist/jquery.hamster-wheel.js

In your web page:

```html

<body>
  <section id="the_wheel"></section>
  
  <script src="jquery.js"></script>
  <script src="dist/hamster-wheel.min.js"></script>
  <script>
      $('#the_wheel').hamsterWheel();
  </script>
</body>
```


## Settings

Pass in options: 
```html

<body>
  <section id="the_wheel"></section>
  
  <script src="jquery.js"></script>
  <script src="dist/hamster-wheel.min.js"></script>
  <script>
      $('#the_wheel').hamsterWheel({ autoscroll: false, clones: 3 });
  </script>
</body>
```

Defaults
```
{
  infinite: true,
  autoscroll: true,
  scrollSpeed: 20,
  scrollDelta: 30,
  clones: 6,
  scrollbar: false
}
```

####infinite - Boolean
This is the main purpose of the plugin, but if you decide you only want to loop through a section like, 5 times and have it spit you out into a footer, more power to you. Maybe jQuery .clone() would be better than this whole plugin but hey, im not judging you.

####autoscroll - Boolean
Do you want the page to scroll on its own?

####scrollSpeed - Number
This is for the autoscroll. Technically this is the number of milliseconds the page will wait before scrolling down one pixel, so you probably want to keep it somewhere between 10 and 50, but play around with it and see what works.

####scrollDelta - Number
When you have autoscroll turned on, how fast does someone need to scroll to change the direction of the autoscroll? Defaults to 30. 

####clones - Number
How many times the content is cloned. 6 is a pretty good number, but if the page is huge and heavy you might want to lower this number, but id suggest 2 or 3 at the minimum. 

####scrollbar - Boolean
This will show or hide the scrollbar (in webkit based browsers). I like it off personally, it helps keep up the illusion.

## License

MIT © Polar Notion
