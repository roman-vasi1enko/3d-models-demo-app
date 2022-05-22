# 3D Models Demo

Slider with interactive 3D models optimized for Desktop and Mobile devices for 3D modeling company expo demonstrations.

**Link to project:** https://modelsdemo.netlify.app/

![Slider Preview](https://github.com/roman-vasi1enko/roman-vasi1enko/raw/main/assets/3dmodels2.gif)

## How It's Made

**Tech used:** HTML, CSS, JavaScript, SketchFab

Slider behavior is built with JavaScript and supports arrow clicks and dragging. The client's goal was to have all models accessible with a swipe/click of the button without waiting for rendering/downloading and have it smoothly working on any screen.

The first major challenge was to allow users to swipe the model slide and keep the model canvas interactive (rotate, zoom in/out, move, change the light angle, etc.) at the same time. As a solution, I made the slider controls on the bottom of the page, so it doesn't overlap with the model canvas keeping it interactive. This allowed making the area in between arrows "swipable".

The second challenge came from the models' size and device performance after rendering. Some of the slides have more than 20,000 thousand geometries, overloading the device's RAM and crashing the browser page on loading. To solve this issue, I limited every model's max texture size and excluded some that included more than 2,000,000 geometries.

## Optimizations

1. Optimized max texture size to speed up model loading and prevent browser page from crashing.
2. Changed slider behavior so it works smoothly on mobile devices.

## Lessons Learned

This was the first time I faced the vRAM overloading on a client's project, so I had to learn about 3D modeling and its optimization so that full-screen, high-quality models won't crash the page when loaded all at once.
