import crafttweaker.api.ingredient.IIngredient;
import crafttweaker.api.item.IItemStack;
import crafttweaker.api.entity.attribute.AttributeOperation;

val stone_axe     = <item:minecraft:stone_axe>.anyDamage();
val stone_shovel  = <item:minecraft:stone_shovel>.anyDamage();
val golden_shovel = <item:minecraft:golden_shovel>.anyDamage();
val golden_axe    = <item:minecraft:golden_axe>.anyDamage();
val golden_sword  = <item:minecraft:golden_sword>.anyDamage();
val shield        = <item:minecraft:shield>.anyDamage();

// === STONE ===
stone_shovel.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_damage>, 
    IItemStack.BASE_ATTACK_DAMAGE_UUID, 
    "extra power", 
    2, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);

stone_axe.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_damage>, 
    IItemStack.BASE_ATTACK_DAMAGE_UUID, 
    "extra power", 
    5, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);
stone_axe.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_speed>, 
    IItemStack.BASE_ATTACK_SPEED_UUID, 
    "extra power", 
    -3.1, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);

// === GOLDEN ===
golden_shovel.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_damage>, 
    IItemStack.BASE_ATTACK_DAMAGE_UUID, 
    "extra power", 
    1, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);

golden_axe.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_damage>, 
    IItemStack.BASE_ATTACK_DAMAGE_UUID, 
    "extra power", 
    5, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);
golden_axe.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_speed>, 
    IItemStack.BASE_ATTACK_SPEED_UUID, 
    "extra power", 
    -2.9, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);

golden_sword.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_speed>, 
    IItemStack.BASE_ATTACK_SPEED_UUID, 
    "extra power", 
    -2.3, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:mainhand>]
);

// === OTHER ===
shield.addGlobalAttributeModifier(
    <attribute:minecraft:generic.attack_damage>, 
    "less power", 
    -1, 
    AttributeOperation.ADDITION, 
    [<constant:minecraft:equipmentslot:offhand>]
);

