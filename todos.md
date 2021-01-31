## Perf

- CSS/JS bundling
- Maybe use Vite?

## Code quality
- Make editor module accept params instead of running its own queries
- Tests
- Linting

## Randomization

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
- Improve focus styles on cards
- Improve details page design
- Add app header
- Improve "hero" section
- Download link
  - Use tiled download
- Add "create new" feature
- Lazy loading
  - better loading indicator. 
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