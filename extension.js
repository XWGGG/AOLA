game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "奥拉星", content: function (config, pack) {
			lib.group.push("ao");
			lib.translate["ao"] = "奥";
		}, precontent: function (ext) {
			if (ext.enable) {
				game.import("character", function () {
					var aolaxing = {
						name: "aolaxing",
						connect: true,
						characterSort: {
							奥拉星: {
								奥拉星: ["wumianzhiwang", "liliangwang", "kaltsit", "xihe", "qiankun","shangguxinglong"],
								其他: []
							}
						},
						character: {
							"wumianzhiwang": ["male", "ao", 3, ["qian", "lvlicaijue"], ["die_audio"]],
							"liliangwang": ["male", "ao", 4, ["lilianghuiyao","wujianchaoying"],["die_audio"]],
							"kaltsit": ["female", "群","2/4/2", ["mon3ter", "buhui"], ["die_audio"]],
							"xihe": ["female", "ao", 3, ["shiguang", "lishi"], ["die_audio"]],
							"qiankun": ["male", "ao",4, ["shenhuazhuzai", "qiankunzhen"], ["die_audio"]],
							"hadisi": ["male", "ao",3, ["lianyu", "tianzui"], ["die_audio"]],
							"shangguxinglong": ["male", "ao",4, ["xingshenzhiyu","yuanhunzhansha"], ["die_audio"]],
						},
						translate: {
							"wumianzhiwang": "无冕之王",
							qian: "潜",
							"qian_info": "每次即将受到伤害时，判定一次，若不为黑桃，则此次伤害降至0。",
							lvlicaijue: "律理裁决",
							"lvlicaijue_info": "当你对目标造成伤害后，令目标停止行动一回合。",

							"kaltsit": "凯尔希",
							mon3ter: "怪物3",
							"mon3ter_info": "出牌阶段，选择2张黑色手牌弃置并令一名其他角色失去1点体力，令自己手牌与护甲+1。",
							buhui: "不毁",
							"buhui_info": "出牌阶段，选择2张红色手牌弃置并回复1点体力，令自己手牌与护甲+1。",

							"liliangwang": "力量王",
							lilianghuiyao: "力量辉耀",
							"lilianghuiyao_info": "受到伤害时，判定一次，黑色体力上限+2，红色体力值+2，如果技能触发后玩家的体力为单数，则额外恢复1点体力并摸一张牌。",
							wujianchaoying: "无间超影",
							"wujianchaoying_info": "出牌阶段，若当前体力值为双数，可选择消耗一半的体力值，使得本回合内造成的伤害翻倍并解除杀的使用限制。",

							"xihe": "羲和",
							lishi: "离时",
							"lishi_info": "上场立刻触发：所有角色每次回合开始时，增加1个离时标记，若标记数量达到或超过12个，清空标记。羲和清空标记时增加体力上限并回满体力值，其他角色则直接死亡。",
							shiguang: "时光",
							"shiguang_info": "场上每当有人体力值发生变化后，判定一次，若为黑桃，此人离时标记+6，否则离时标记+1。",

							"qiankun": "乾坤",
							shenhuazhuzai: "神化主宰",
							"shenhuazhuzai_info": "觉醒技，回合开始时，可选择令自身本回合停止行动，从而进入3回合的神化状态：体力上限翻倍，攻击造成的伤害+1，且等额回复",
							qiankunzhen: "乾坤震",
							"qiankunzhen_info": "直接对目标造成一点伤害，出牌阶段限一次。",

							"hadisi": "哈迪斯",
							lianyu: "炼狱",
							"lianyu_info": "出牌阶段限一次：弃掉一张梅花牌，指定一名玩家，令其获得一枚炼狱标记，使其下一次回血反扣。",
							tianzui: "天罪",
							"tianzui_info": "在出牌阶段限一次使用。弃置一张黑桃花色的手牌，直接吸取目标角色的一点体力值与体力上限。",

							"shangguxinglong": "上古星龙",
							xingshenzhiyu: "星神之域",
							"xingshenzhiyu_info": "每回合开始时获得1枚“星神之域”标记，受伤前，可以选择消耗1个标记来抵消此次伤害。",
							yuanhunzhansha: "元魂斩杀",
							"yuanhunzhansha_info": "消耗N枚“星神之域”标记，并进行多次连续攻击N次，每次攻击造成1点伤害，且进行判定，红桃：恢复1点体力；方块：摸两张牌；黑桃：伤害+1；梅花：“星神之域”标记+1",

						},
						skill: {
							_dieAudioMOU: {
								trigger: { global: 'dieBegin', },
								priority: 2,
								forced: true,
								unique: true,
								frequent: true,
								content: function () {
									if (trigger.player.name) game.playAudio('..', 'extension', '奥拉星', trigger.player.name);
								}
							},
							xingshenzhiyu: {
								trigger: { player: 'phaseBegin' },
								forced: true,
								mark: true,
								content: function() {
									player.addMark('xingshenzhiyu', 1);
									// Add temporary skill
									if (!player.hasSkill('xingshenzhiyu_dixiao')) {
										player.addSkill('xingshenzhiyu_dixiao');
									}
								},
								intro: {
									content: '每个回合开始时获得1个星神之域标记。'
								},
								subSkill: {
									dixiao: {
										trigger: { player: 'damageBefore' },
										filter: function(event, player) {
											return player.countMark('xingshenzhiyu') > 0;
										},
										direct: true,
										content: function() {
											'step 0'
											player.chooseControl('确认消耗', '取消').set('ai', function() {
												if (player.countMark('xingshenzhiyu') > 1) return '确认消耗';
												return '取消';
											}).set('prompt', '是否消耗1个星神之域标记来抵消此次伤害？');
											'step 1'
											if (result.control == '确认消耗') {
												player.removeMark('xingshenzhiyu', 1);
												trigger.num = 0; // Nullify damage
												var chat = ['星神之域化解了此次伤害！'].randomGet();
												player.say(chat);
												// Check mark count, remove temporary skill if zero
												if (player.countMark('xingshenzhiyu') === 0) {
													player.removeSkill('xingshenzhiyu_dixiao');
												}
											} else if (result.control == '取消') {
												// Do nothing
											}
										},
									}
								},
							},
							
							yuanhunzhansha: {
								enable: 'phaseUse',
								filter: function(event, player) {
									return player.countMark('xingshenzhiyu') >= 3;
								},
								filterTarget: function(card, player, target) {
									return player != target;
								},
								selectTarget: 1,
								content: function() {
									'step 0'
									var marks = player.countMark('xingshenzhiyu');
									player.removeMark('xingshenzhiyu', marks);
									player.storage.yuanhunzhansha = marks;
									player.markSkill('yuanhunzhansha');
									'step 1'
									if (player.storage.yuanhunzhansha > 0) {
										player.storage.yuanhunzhansha--;
										player.judge(function(card) {
											if (get.suit(card) == 'heart') return 1;
											if (get.suit(card) == 'diamond') return 2;
											if (get.suit(card) == 'spade') return 3;
											if (get.suit(card) == 'club') return 4;
										});
									} else {
										player.unmarkSkill('yuanhunzhansha');
										event.finish();
									}
									'step 2'
									switch (result.judge) {
										case 1:
											player.gainMaxHp();
											player.update();
											player.recover();
											break;
										case 2:
											player.draw(2);
											break;
										case 3:
											event.extraDamage = true;
											break;
										case 4:
											player.addMark('xingshenzhiyu', 1);
											break;
									}
									'step 3'
									if (target.countCards('h', 'shan')) {
										target.chooseToUse({ name: 'shan' }, '使用一张闪来闪避这次攻击').set('ai', function(card) {
											return -1;
										});
									} else {
										if (event.extraDamage) {
											target.damage(2);
											event.extraDamage = false;
										} else {
											target.damage(1);
										}
										event.goto(1);
									}
									'step 4'
									if (result.bool) {
										player.storage.yuanhunzhansha++; // Increase the attack count if dodged
									} else {
										if (event.extraDamage) {
											target.damage(2);
											event.extraDamage = false;
										} else {
											target.damage(1);
										}
									}
									event.goto(1);
								},
								ai: {
									order: 10,
									result: {
										target: function(player, target) {
											return -1;
										},
									},
								},
								intro: {
									content: '对指定目标进行多次连续攻击，攻击次数等于消耗的标记数。',
								},
							},
														
							lianyu: {
								enable: "phaseUse",
								usable: 1,
								filter: function(event, player) {
									return player.countCards('h', { suit: 'club' }) > 0;
								},
								filterTarget: function(card, player, target) {
									return player != target;
								},
								content: function() {
									'step 0'
									player.chooseCard('h', { suit: 'club' }, '请选择一张梅花手牌弃置').set('ai', function(card) {
										return 6 - get.value(card);
									});
									'step 1'
									if (result.bool) {
										player.logSkill('lianyu');
										player.discard(result.cards);
										target.addMark('lianyu', 1);
										target.addSkill('lianyu_debuff');
									}
								},
								mark: true,
								intro: {
									content: '回血反扣',
								},
								subSkill: {
									debuff: {
										trigger: { player: 'recoverEnd' },
										forced: true,
										filter: function(event, player) {
											return player.countMark('lianyu') > 0;
										},
										content: function() {
											var loseHpAmount = trigger.num * 2; // 计算双倍扣除的体力值
											player.removeMark('lianyu', 1);
											player.loseHp(loseHpAmount);
											player.removeSkill('lianyu_debuff');
											if (game.hasPlayer(function(p) {
												return p.name == 'hadisi';
											})) {
												var hadisi = game.findPlayer(function(p) {
													return p.name == 'hadisi';
												});
												hadisi.recover(1);
											}
											player.removeSkill('lianyu_debuff');
										},
										sub: true,
									},
								},
							},							
														
							tianzui: {
								enable: "phaseUse",
								usable: 1,
								filter: function(event, player) {
									return player.countCards('h', { suit: 'spade' }) > 0;
								},
								filterCard: function(card) {
									return get.suit(card) == 'spade';
								},
								check: function(card) {
									return 6 - get.value(card);
								},
								position: 'h',
								content: function() {
									'step 0'
									player.discard(result.cards);
									player.chooseTarget('选择一名角色吸取其1点体力上限与体力值', function(card, player, target) {
										return player != target;
									}).set('ai', function(target) {
										return -get.attitude(player, target);
									});
									'step 1'
									if (result.bool) {
										var target = result.targets[0];
										target.loseHp(1);
										target.loseMaxHp(1);
										target.update(); // 即时更新体力上限
										player.gainMaxHp(1);
										player.update(); // 即时更新体力上限
										player.recover(1);

									}
								},
							},
							
							shenhuazhuzai : {
								trigger: { player: "phaseBegin" },
								skillAnimation: true,
								animationColor: "orange",
								filter: function (event, player) {
									return !player.storage.shenhuazhuzai;
								},
								content: function () {
									player.awakenSkill('shenhuazhuzai');
									player.storage.shenhuazhuzai = true;
									player.addSkill('shenhuazhuzai_damageBoost');
									player.addSkill('shenhuazhuzai_healOnDamage');
									player.addSkill('shenhuazhuzai_endEffects'); // 添加计时器子技能
									player.maxHp *= 2;
									player.update();
									player.storage.shenhuazhuzai_turns = 0; // 初始化回合计数为0
									player.markSkill('shenhuazhuzai');
									player.skip('phaseDraw');
									player.skip('phaseUse');
								},
								subSkill: {
									damageBoost: {
										trigger: { source: "damageBefore" },
										filter: function (event, player) { return event.source === player; },
										forced: true,
										content: function () {
											trigger.num += 1;
										},
										sub: true,
									},
									healOnDamage: {
										trigger: { source: "damageBegin" },
										filter: function (event, player) { return event.source === player && player.hp < player.maxHp; },
										forced: true,
										content: function () {
											var damage = trigger.num; // 获取造成的伤害
											player.recover(damage); // 将伤害值用于体力回复
										},
										sub: true,
									},
									endEffects: {
										trigger: { player: "phaseEnd" },
										filter: function (event, player) {
											return player.storage.shenhuazhuzai; // 仅在技能激活时触发
										},
										forced: true,
										content: function () {
											player.storage.shenhuazhuzai_turns += 1; // 增加回合计数
											if (player.storage.shenhuazhuzai_turns >= 3) {
												player.removeSkill('shenhuazhuzai_damageBoost'); // 移除子技能
												player.removeSkill('shenhuazhuzai_healOnDamage'); // 移除子技能
												player.maxHp /= 2; // 恢复体力上限
												player.update();
												player.storage.shenhuazhuzai = false; // 禁用主技能
												player.removeSkill('shenhuazhuzai_endEffects'); // 移除计时器子技能
												player.unmarkSkill('shenhuazhuzai');
												player.addMark('shenhua', 1); // 添加“神化”标记
											}
										},
										sub: true,
									},
								},
								mark: true,
								intro: {
									content: function(storage, player) {
										if (player.storage.shenhuazhuzai_turns !== undefined) {
											return '当前神化状态剩余回合数：' + (3 - player.storage.shenhuazhuzai_turns);
										}
										return '神化状态下：体力上限翻倍，攻击造成的伤害+1，且等额回复';
									}
								},
								init: (player, skill) => player.storage[skill] = false,
							},			
							qiankunzhen: {
								enable: "phaseUse",
								usable: 1,
								filterTarget: function (card, player, target) {
									return player != target;
								},
								content: function () {
									target.damage();
								}
							},							
							lishi: {
								trigger: { global: "phaseBegin" },
								forced: true,
								content: function() {
									var current = trigger.player; // 当前回合角色
									current.addMark('lishi', 1);
									current.popup('离时 +1 (' + current.countMark('lishi') + ')');
									game.log(current, '获得了1个离时标记，当前离时标记数量：', current.countMark('lishi'));
							
									if (current.countMark('lishi') >= 12) {
										current.removeMark('lishi', current.countMark('lishi'));
										current.popup('离时标记清空');
										game.log(current, '的离时标记被清空');
							
										if (current == player) { // 如果当前回合角色是技能拥有者
											current.gainMaxHp();
											current.update();
											current.recover(999);
											current.popup('体力上限+1，体力值回满');
											game.log(current, '增加了1点体力上限并回满了体力值');
										} else {
											current.die();
											game.log(current, '因离时标记死亡');
										}
									}
								},
								mark: true,
								intro: {
									content: function(storage, player) {
										return '当前离时标记数量：' + player.countMark('lishi');
									}
								},
							},
							
							shiguang: {
								trigger: { global: "changeHpEnd" },
								forced: true,
								content: function() {
									'step 0'
									trigger.player.judge(function(card) {
										return get.suit(card) == 'spade' ? 2 : -2;
									});
									'step 1'
									if (result.judge == 2) {
										trigger.player.addMark('lishi', 6);
										trigger.player.popup('离时 +6 (' + trigger.player.countMark('lishi') + ')');
										game.log(trigger.player, '获得了6个离时标记，当前离时标记数量：', trigger.player.countMark('lishi'));
									} else {
										trigger.player.addMark('lishi', 1);
										trigger.player.popup('离时 +1 (' + trigger.player.countMark('lishi') + ')');
										game.log(trigger.player, '获得了1个离时标记，当前离时标记数量：', trigger.player.countMark('lishi'));
									}
								},
							},
							qian: {
								trigger: { player: "damageBegin" },
								forced: true,
								content: function() {
									'step 0'
									player.judge(function(card) {
										return get.suit(card) !== 'spade';
									});
									'step 1'
									if (result.bool) {
										trigger.num = 0;
									}
								},
							},
							lvlicaijue: {
								trigger: { source: "damageEnd" },
								filter: function(event, player) {
									return event.player != player && event.num > 0;
								},
								direct: true,
								content: function() {
									var target = trigger.player;
									target.addSkill("lvlicaijue_stop");
								},
								subSkill: {
									stop: {
										trigger: { player: "phaseBegin" },
										forced: true,
										content: function() {
											player.skip("phaseDraw");
											player.skip("phaseUse");
											player.removeSkill("lvlicaijue_stop");
										},
										sub: true,
									}
								}
							},
										
							lilianghuiyao: {
								trigger: { player: ["damageEnd", "loseHpEnd"] },
								forced: true,
								content: function() {
									'step 0'
									player.judge(function(card) {
										if (get.color(card) == 'black') {
											player.maxHp += 2;
											player.update();
											game.log(player, '的体力上限增加了2');
										} else if (get.color(card) == 'red') {
											player.recover(2);
											game.log(player, '恢复了2点体力');
										}
									});
									'step 1'
									if (player.hp % 2 !== 0) {
										player.recover(1);
										player.draw();
										game.log(player, '体力为单数，体力恢复1点并摸一张牌');
									}
								},
							},
							
							wujianchaoying: {
								enable: "phaseUse",
								usable: 1,
								filter: function(event, player) {
									return player.hp % 2 === 0;
								},
								content: function() {
									'step 0'
									player.chooseBool('是否消耗一半的体力值以在本回合内造成的伤害翻倍并解除杀的使用限制？').ai = function() {
										return true;
									};
									'step 1'
									if (result.bool) {
										player.loseHp(Math.floor(player.hp / 2));
										player.addTempSkill('wujianchaoying_effect', {player: 'phaseEnd'});
										game.log(player, '消耗了一半的体力值，使得本回合内造成的伤害翻倍并解除杀的使用限制');
									}
								},
								subSkill: {
									effect: {
										trigger: {source: "damageBefore"},
										forced: true,
										filter: function(event, player) {
											return event.source === player;
										},
										content: function() {
											trigger.num *= 2;
										},
										mod: {
											cardUsable: function(card, player, num) {
												if (card.name == 'sha') return Infinity;
											},
										},
										sub: true,
									},
								},
							},
																	
							mon3ter: {
								enable: "phaseUse",
								usable: 1,
								filter: function (event, player) {
									return player.countCards('h', { color: 'black' }) >= 2;
								},
								content: function () {
									'step 0'
									player.chooseCard('选择2张黑色手牌弃置', 2, { color: 'black' }).set('ai', function (card) {
										return 6 - get.value(card);
									});
									'step 1'
									if (result.bool) {
										player.logSkill('kaltsit');
										player.discard(result.cards);
										player.chooseTarget('选择一名角色失去2点体力', function (card, player, target) {
											return target != player;
										}).set('ai', function (target) {
											return -get.attitude(player, target);
										});
									}
									'step 2'
									if (result.bool) {
										result.targets[0].loseHp(1);
										player.draw(1);
										player.changeHujia(1);
									}
								},
							},
							
							buhui: {
								enable: "phaseUse",
								usable: 1,
								filter: function (event, player) {
									return player.countCards('h', { color: 'red' }) >= 2;
								},
								content: function () {
									'step 0'
									player.chooseCard('选择2张红色手牌弃置', 2, { color: 'red' }).set('ai', function (card) {
										return 6 - get.value(card);
									});
									'step 1'
									if (result.bool) {
										player.logSkill('buhui');
										player.discard(result.cards);
										player.recover();
										player.draw();
										player.changeHujia(1);
									}
								},
							},
							
						}
					};
					if (lib.device || lib.node) {
						for (var i in aolaxing.character) {
							aolaxing.character[i][4].push("ext:奥拉星/" + i + ".jpg");
						}
					}
					else {
						for (var i in aolaxing.character) {
							aolaxing.character[i][4].push("db:extension-奥拉星:" + i + ".jpg");
						}
					}
					return aolaxing;
				});
				lib.config.all.characters.push("aolaxing");
				if (!lib.config.characters.contains("aolaxing")) lib.config.characters.push("aolaxing");
				lib.translate["aolaxing_character_config"] = "奥拉星";
				lib.config.all.cards.push("aolaxing");
				if (!lib.config.cards.contains("aolaxing")) lib.config.cards.push("aolaxing");
				lib.translate["aolaxing_card_config"] = "奥拉星";
			}
		}, help: {}, config: {}, package: {
			character: {
				character: {},
				translate: {}
			},
			card: {
				card: {},
				translate: {},
				lishit: []
			},
			skill: {
				skill: {},
				translate: {}
			},
			intro: "可联机的奥拉星武将扩展包，本来是想做明日方舟武将扩展的，于是有了凯尔希，后来还是觉得奥拉星的很多角色机制更有趣一点，于是就改成奥拉星了。",
			author: "潜水群",
			diskURL: "",
			forumURL: "",
			version: "1.0.0",
		}, files: { "character": [], "card": [], "skill": [] }
	}
})