module.exports = function(id) {
  const name = id.replace(/-/g, ' ');
  return name[0].toUpperCase() + name.slice(1);
}