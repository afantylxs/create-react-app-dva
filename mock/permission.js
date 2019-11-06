function getPermission(req, res) {
  const list = [
    'SPACE',
    'SPACE_LIST',
    'SPACE_COMMODITY',
    'APARTMENT',
    'APARTMENT_LIST'
  ]

  res.json({
    code: 200,
    data: list,
    message: 'success'
  })
}

module.exports = {
  'get/permission': getPermission
}