const {i18n, error, config, getStore} = window

const __ = i18n.main.__.bind(i18n.main)

window.addEventListener('game.response',
  ({detail: {path, body}}) => {
    if (path === '/kcsapi/api_get_member/mapinfo') {
      const basic = getStore('info.basic')
      const errMsg = []
      if (config.get('poi.mapStartCheck.ship.enable', false)) {
        const minShipSlots = config.get('poi.mapStartCheck.ship.minFreeSlots', 4)
        const shipSlots = basic.api_max_chara - Object.keys(getStore('info.ships')).length
        if (shipSlots < minShipSlots) {
          if (shipSlots > 0){
            errMsg.push(__("Only %s free ship slot(s) left. ", shipSlots))
          } else {
            errMsg.push(__("Ship slot is full. "))
          }
        }
      }
      if (config.get('poi.mapStartCheck.item.enable', false)) {
        const minEquipSlots = config.get('poi.mapStartCheck.item.minFreeSlots', 10)
        const equipSlots = basic.api_max_slotitem - Object.keys(getStore('info.equips')).length
        if (equipSlots < minEquipSlots) {
          if (equipSlots > 0){
            errMsg.push(__("Only %d free equip slot(s) left. ", equipSlots))
          } else {
            errMsg.push(__("Equip slot is full. "))
          }
        }
      }
      if (errMsg.length > 0) {
        const msg = errMsg.join('')
        setTimeout(() => error(msg) , 1000)
      }
    }
  }
)
