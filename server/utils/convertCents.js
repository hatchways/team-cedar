function convertCents(value) {
  const convert = value ? Math.round(parseFloat(value) * 100) : 0;
  return convert
}
module.exports = convertCents;