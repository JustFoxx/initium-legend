// priority: 1

/**
 * @param {Internal.Registry.Item} event
 */
const item = event => {
    event.create("copper_nugget").maxStacksSize(64).texture("kubejs:item/copper_nugget")
    event.create("diamond_nugget").maxStacksSize(64).texture("kubejs:item/diamond_nugget")
}