let max_timer = 200 //measured in ticks(1 second is 20 ticks)[this var applies to everyone]

//runs every player tick
onEvent('player.tick', event => {
	//packs the whole code into a function with 2 variables(dim_name and stab_list)
	function StabilizerLogic(dim_name, stab_list) {
		//checks if the entity is player and if they are in the correct dimension 
		if (event.entity.type == "minecraft:player" && dim_name) {
			//checks if the variable stab_timer is less than 1, if it is, makes it one, if it isn't adds 1 and a random number between 0 and 5
			if (event.player.persistentData.stab_timer < 1) {
				event.player.persistentData.stab_timer = 1
			} else {
				event.player.persistentData.stab_timer += 1 + (Math.random() * 5)
			}
			if (event.player.persistentData.tp_count < 1)
				event.player.persistentData.tp_count = 1
			//checks if stab_timer is greater than max_timer
			if (event.player.persistentData.stab_timer >= max_timer) {
				//gives player slowness effect with a random time and creates a variable 'i'
				event.server.runCommandSilent('effect give ' + event.player.name + ' minecraft:slowness ' + Math.round(Math.random() * 20 + 5) + ' 2 true')
				event.player.persistentData.i = 0
				//loops 16 times, or 'i' is greater than 15. Adds 1 for every step
				for (; event.player.persistentData.i < 15; event.player.persistentData.i++) {
					//Creates an unstable variant of player's coordinate 'x'. Has 50% to add a number between 0 and 4, and 50% to subtract a number between 0 and 4
					if (Math.random() >= 0.5) {
						event.player.persistentData.unstable_x = event.player.x + (Math.random() * 4)
					} else {
						event.player.persistentData.unstable_x = event.player.x - (Math.random() * 4)
					}
					//Creates an unstable variant of player's coordinate 'y'. Has 50% to add a number between 0 and 1, and 50% to subtract a number between 0 and 1
					if (Math.random() >= 0.5) {
						event.player.persistentData.unstable_y = event.player.y + Math.random()
					} else {
						event.player.persistentData.unstable_y = event.player.y - Math.random()
					}
					//Creates an unstable variant of player's coordinate 'z'. Has 50% to add a number between 0 and 4, and 50% to subtract a number between 0 and 4
					if (Math.random() >= 0.5) {
						event.player.persistentData.unstable_z = event.player.z + (Math.random() * 4)
					} else {
						event.player.persistentData.unstable_z = event.player.z - (Math.random() * 4)
					}
					//checks if unstable coordinates are:
					//air block
					//air block
					//not an air block
					if (event.level.getBlock(event.player.persistentData.unstable_x, event.player.persistentData.unstable_y, event.player.persistentData.unstable_z) != "minecraft:air" && event.level.getBlock(event.player.persistentData.unstable_x, (event.player.persistentData.unstable_y + 1), event.player.persistentData.unstable_z) == "minecraft:air" && event.level.getBlock(event.player.persistentData.unstable_x, (event.player.persistentData.unstable_y + 2), event.player.persistentData.unstable_z) == "minecraft:air") {
						//teleports player to unstable coords with sounds and particles
						event.server.runCommandSilent('execute as ' + event.player.name + ' at ' + event.player.name + ' run particle minecraft:reverse_portal ~ ~ ~ 1 1 1 0.01 250 normal')
						event.server.runCommandSilent('execute as ' + event.player.name + ' at ' + event.player.name + ' run tp ' + event.player.name + ' ' + event.player.persistentData.unstable_x + ' ' + (Math.ceil(event.player.persistentData.unstable_y)) + ' ' + event.player.persistentData.unstable_z)
						event.server.runCommandSilent('execute as ' + event.player.name + ' at ' + event.player.name + ' run playsound minecraft:block.respawn_anchor.deplete player ' + event.player.name + ' ~ ~ ~')
						//makes stab_timer to 0, adds 1 to tp_count and makes i 15.
						event.player.persistentData.stab_timer = 0
						event.player.persistentData.tp_count += 1
						event.player.persistentData.i = 15
					}
				}
			}
			//checks if the tp_count is equal or greater than 6
			if (event.player.persistentData.tp_count >= 6) {
				//teleports player to the void with sounds and particles
				event.server.runCommandSilent('execute as ' + event.player.name + ' at ' + event.player.name + ' run particle minecraft:squid_ink ~ ~ ~ 1 1 1 0.01 250 normal')
				event.server.runCommandSilent('execute as ' + event.player.name + ' at ' + event.player.name + ' run tp ' + event.player.name + ' ~ -64 ~')
				event.server.runCommandSilent('execute as ' + event.player.name + ' at ' + event.player.name + ' run playsound minecraft:block.end_portal.spawn player ' + event.player.name + ' ~ ~ ~')
				//makes stab_timer to 0 and tp_count to 0
				event.player.persistentData.stab_timer = 0
				event.player.persistentData.tp_count = 0
			}
		}
		//checks if the player is in the correct dimension and has one of the correct stabilizers
		if (event.entity.type == "minecraft:player" && dim_name && stab_list) {
			//sets stab_timer to 0
			event.player.persistentData.stab_timer = 0
			event.player.persistentData.tp_count = 0
		}
	}
	//checks if items exist in inventory
	const check = (items) => {
		let i = 0
		let correctItems = items.map(item => {
			if (event.player.inventory.count(item) != 0) return 1
		})
		if (correctItems.includes(1)) i = 1
		return 1
	}
	//dimensions
	const bumblezoneDim = { "the_bumblezone:the_bumblezone": true }
	const netherDim = { "minecraft:the_nether": true }
	const dungeonDim = {
		"dimdoors:dungeon_pockets": true,
		"dimdoors:public_pockets": true,
		"dimdoors:personal_pockets": true,
		"dimdoors:limbo": true,
	}
	const aetherDim = { "the_aether:the_aether": true }
	const endDim = { "minecraft:the_end": true }
	//items required for dimension
	const bumblezoneItems = [
		"kubejs:stabilizer_overworld",
		"kubejs:stabilizer_bumblezone",
		"kubejs:stabilizer_nether",
		"kubejs:stabilizer_doors",
		"kubejs:stabilizer_aether",
		"kubejs:stabilizer_end"
	]
	const netherItems = [
		"kubejs:stabilizer_bumblezone",
		"kubejs:stabilizer_nether",
		"kubejs:stabilizer_doors",
		"kubejs:stabilizer_aether",
		"kubejs:stabilizer_end"
	]
	const dungeonItems = [
		"kubejs:stabilizer_nether",
		"kubejs:stabilizer_doors",
		"kubejs:stabilizer_aether",
		"kubejs:stabilizer_end"
	]
	const aetherItems = [
		"kubejs:stabilizer_doors",
		"kubejs:stabilizer_aether",
		"kubejs:stabilizer_end"
	]
	const endItems = [
		"kubejs:stabilizer_aether",
		"kubejs:stabilizer_end"
	]

	//bumblezone(function version)
	StabilizerLogic(bumblezoneDim[event.level.dimension], check(bumblezoneItems))

	//nether (function version)
	StabilizerLogic(netherDim[event.level.dimension], check(netherItems))

	//doors (function version)
	StabilizerLogic(dungeonDim[event.level.dimension], check(dungeonItems))

	//aether (function version)
	StabilizerLogic(aetherDim[event.level.dimension], check(aetherItems))

	//end (function version)
	StabilizerLogic(endDim[event.level.dimension], check(endItems))

})