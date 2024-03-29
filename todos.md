## Perf

- CSS/JS bundling
- Maybe use Vite?

## Code quality

- Better comments
- Tests
- Linting
- Abstract out CSS vars
  - Transitions
  - Border radius
  - sizing
  - colors

## Tesselations

- Add curved sides
  - Use absolute positioning to make this simpler
- Add more randomness to # of points
- Fine tune color generation
- Add rotation
- Add different geometries
- Screen reader/meta description
- Ability to pass in options
- Checkerboard style
- Add created date

## App UI

- better color pickers?
  - Use HSL pickers created for blog post
- Cards
  - Improve focus styles
- Buttons
  - Confirm a11y in all states
- Toaster
  - Improve styles
    - differentiate from button
    - hover? focus?
- Improve details page design
- Improve "hero" section
- Download link
  - Use tiled download?
  - Add to home page?
- Add "create new" feature
- Add about page?
- Lazy loading
  - better loading indicator. Skeletons?
  - intersection observer could track listings instead of a loading element?
  - Reset page position for screen readers/keyboard users after load?
  - Reuse existing tesselations before making more

## Issues

- Sometimes the strokes don't contrast well enough.
- Are complementary colors too intense? Should these be less common? Less saturated? Less bright?
- Using base 64 increases size of background CSS
- Should server side code by async?
- Switch data storage to database?
- When creating a new name are we confident it's not already in use?
- Curve control points are sometimes too extreme leading to two segmented shapes
