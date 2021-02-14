## Perf

- CSS/JS bundling
- Maybe use Vite?

## Code quality

- Tests
- Linting
- Abstract out CSS vars

## Tesselations

- Add curved sides
- Add more randomness to # of points
- Fine tune color generation
- Add rotation
- Add different geometries
- Screen reader/meta description
- Ability to pass in options
- Checkerboard style

## App UI

- better color pickers?
  - https://shoelace.style/components/color-picker
- Cards
  - Improve focus styles
  - Add edit/download buttons
- Improve details page design
- Add app header
- Improve "hero" section
- Download link
  - Reinstate?
  - Use tiled download
- Add "create new" feature
- Add about page?
- Lazy loading
  - better loading indicator.
  - intersection observer could track listings instead of a loading element?
  - Reset page position for screen readers/keyboard users after load?
  - Reuse existing tesselations before making more

## Security

- Does the way I'm merging the query string leave XSS vulns? I should probably check for certain properties and validate them

## Issues

- Sometimes the strokes don't contrast well enough.
- Are complementary colors too intense? Should these be less common? Less saturated? Less bright?
- Using base 64 increases size of background CSS
- Should server side code by async?
- Switch data storage to database?
- When creating a new name are we confident it's not already in use?
