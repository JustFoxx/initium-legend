scoreboard objectives add __ dummy
scoreboard objectives add _ dummy
execute unless score _ _ matches 0.. run function ep:spawn
scoreboard players add _ _ 0