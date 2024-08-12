game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "AOLA", content: function (config, pack) {
			lib.group.push("ao");
			lib.translate["ao"] = "奥";
		}, precontent: function (ext) {
			if (ext.enable) {
				game.import("character", function () {
					var aolaxing = {
						name: "aolaxing",
						connect: true,
						characterSort: {
							AOLA: {
								AOLA: ["wumianzhiwang", "xihe", "qiankun","shangguxinglong","feier",],
								其他: []
							}
						},
						character: {
							"wumianzhiwang": ["male", "ao", 4, ["qian", "lvlicaijue"], ["die_audio"]],
							"xihe": ["female", "ao", 4, ["shiguang", "lishi"], ["die_audio"]],
							"qiankun": ["male", "ao",4, ["shenhuazhuzai", "qiankunzhen"], ["die_audio"]],
							"hadisi": ["male", "ao",4, ["lianyu", "tianzui"], ["die_audio"]],
							"shangguxinglong": ["male", "ao",4, ["xingshenzhiyu","yuanhunzhansha"], ["die_audio"]],
							"feier": ["male", "ao",4, ["xvwutunyan","fenjintianxia"], ["die_audio"]],
						},
						translate: {
							"wumianzhiwang": "无冕之王",
							qian: "潜",
							"qian_info": "每次受到伤害时，判定一次，若此牌的点数小于9，则免除此次伤害。",
							lvlicaijue: "律理裁决",
							"lvlicaijue_info": "当你对目标造成伤害后，令目标停止行动一回合。",

							"xihe": "羲和",
							lishi: "离时",
							"lishi_info": "上场立刻触发：所有角色每次回合开始时，增加1个离时标记，若标记数量达到或超过12个，清空标记。羲和清空标记时增加体力上限并回满体力值，其他角色则直接死亡。",
							shiguang: "时光",
							"shiguang_info": "场上每当有人体力值发生变化后，判定一次，若为黑桃，离时标记+6，否则离时标记+1。",

							"qiankun": "乾坤",
							shenhuazhuzai: "神化主宰",
							"shenhuazhuzai_info": "觉醒技，回合开始时，可选择令自身本回合停止行动，从而进入3回合的神化状态：体力上限翻倍，攻击造成的伤害+1，且等额回复",
							qiankunzhen: "乾坤震",
							"qiankunzhen_info": "直接对目标造成一点伤害，出牌阶段限一次。",

							"hadisi": "哈迪斯",
							lianyu: "炼狱",
							"lianyu_info": "出牌阶段限一次：弃置一张梅花牌，指定一名玩家，令其获得一枚炼狱标记，使其下一次回血反扣的同时哈迪斯体力+2。",
							tianzui: "天罪",
							"tianzui_info": "在出牌阶段限一次：弃置一张黑桃花色的手牌，直接吸取目标角色的一点体力值与体力上限。",

							"shangguxinglong": "上古星龙",
							xingshenzhiyu: "星神之域",
							"xingshenzhiyu_info": "每回合开始时获得1枚“星神之域”标记，受伤前，可以选择消耗1个标记来抵消此次伤害。",
							yuanhunzhansha: "元魂斩杀",
							"yuanhunzhansha_info": "消耗N枚“星神之域”标记，并进行多次连续攻击N次，每次攻击造成1点伤害，且进行判定，红桃：恢复1点体力；方块：手牌+1；黑桃：伤害+1；梅花：“星神之域”标记+1",

							"feier": "菲尔",
							xvwutunyan: "虚无吞炎",
							"xvwutunyan_info": "攻击造成伤害后，令伤害来源获得1枚“虚无吞炎”：回合开始后判定一次，若为红色:虚无吞炎标记+1，且跳过出牌阶段。黑色：则失去1点体力，且跳过摸牌阶段。",
							fenjintianxia: "焚尽天下",
							"fenjintianxia_info": "出牌阶段，可以选择消耗自身一点体力上限，让自身体力值回满，并对全场叠加1枚“虚无吞炎”标记。",
						},
						skill: {
							_dieAudioMOU: {
								trigger: { global: 'dieBegin', },  // 触发条件为全局事件 'dieBegin'
								priority: 2,                        // 触发优先级设为2
								forced: true,                       // 强制触发
								unique: true,                       // 独特触发，不允许重复触发
								frequent: true,                     // 频繁触发，可能在短时间内多次触发
								content: function () {              // 触发时执行的函数
									if (trigger.player.name)        // 如果触发事件的玩家有名字
										game.playAudio('..', 'extension', 'AOLA', 'audio', 'death', trigger.player.name); // 更新后的音频路径
								}
							},
							qian: {
								audio: "ext:AOLA/audio/skill/qian.mp3",
								trigger: { 
									player: "damageBegin" 
								},
								forced: true,
								filter: function (event, player) {
									return event.num > 0; // 只在攻击有效时触发
								},
								content: function() {
									"step 0"
									player.judge(function(card) {
										return get.number(card)< 9; // 判定牌的点数是否小于9
									});
							
									"step 1"
									if (result.bool) {
										trigger.num = 0; // 如果点数小于9，取消此次攻击的伤害
										var chat = ['无效！'].randomGet();
												player.say(chat);
									}
								},
							},
														
							lvlicaijue: {									
								forced: true,							
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
										audio:"ext:AOLA/audio/skill/lvlicaijue.mp3",
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
																					
							xvwutunyan: {
								trigger: { source: 'damageEnd' },
								forced: true,
								filter: function(event, player) {
									return event.player != player;
								},
								content: function() {
									trigger.player.addMark('xvwutunyan', 1);
									if (!trigger.player.hasSkill('xvwutunyan_effect')) {
										trigger.player.addSkill('xvwutunyan_effect');
									}
								},
								intro: {
									content: 'mark',
								},
								subSkill: {
									effect: {
										trigger: { player: 'phaseBegin' },
										forced: true,
										content: function() {
											player.removeMark('xvwutunyan', 1);
											player.judge(function(card) {
												if (get.color(card) == 'red') {
													player.addMark('xvwutunyan', 1);
													player.skip('phaseUse');
												} else {
													player.loseHp(1);
													player.skip('phaseDraw');
												}
											});
											if (player.countMark('xvwutunyan') === 0) {
												player.removeSkill('xvwutunyan_effect');
											}
										},
										sub: true,
									},
								},
							},

							fenjintianxia: {
								enable: 'phaseUse',
								usable: 1,
								filter: function(event, player) {
									return player.maxHp > 1;
								},
								content: function() {
									player.loseMaxHp(1);
									player.recover(player.maxHp - player.hp); // 回满体力
									game.players.forEach(function(target) {
										if (target != player) {
											target.addMark('xvwutunyan', 1);
											if (!target.hasSkill('xvwutunyan_effect')) {
												target.addSkill('xvwutunyan_effect');
											}
										}
									});
								},
								ai: {
									order: 10,
									result: {
										player: function(player) {
											return player.maxHp > 1 ? 1 : -1;
										},
									},
								},
								intro: {
									content: '消耗1点体力上限，回满体力并给其他所有角色添加2枚“虚无吞炎”标记。',
								},
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
											player.recover();
											break;
										case 2:
											player.draw();
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
											var loseHpAmount = trigger.num * 2;
											player.removeMark('lianyu', 1);
											player.loseHp(loseHpAmount);
											player.removeSkill('lianyu_debuff');
											if (game.hasPlayer(function(p) {
												return p.name == 'hadisi';
											})) {
												var hadisi = game.findPlayer(function(p) {
													return p.name == 'hadisi';
												});
												hadisi.recover(2);
											}
											player.removeSkill('lianyu_debuff');
										},
										sub: true,
									},
								},
								ai: {
									order: 7,
									result: {
										player: function(player) {
											// AI 判断是否使用技能的逻辑
											if (player.countCards('h', { suit: 'club' }) > 0) {
												return 1; // 返回正数表示倾向于使用
											}
											return 0; // 返回 0 表示不使用
										},
										target: function(player, target) {
											return -1; // AI 选择态度不好的目标
										}
									}
								}
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
										target.update();
										player.gainMaxHp(1);
										player.update();
										player.recover(1);
									}
								},
								ai: {
									order: 7,
									result: {
										player: function(player) {
											// AI 判断是否使用技能的逻辑
											if (player.countCards('h', { suit: 'spade' }) > 0) {
												return 1; // 返回正数表示倾向于使用
											}
											return 0; // 返回 0 表示不使用
										},
										target: function(player, target) {
											return -1; // AI 选择态度不好的目标
										}
									}
								}
							},
							
							shenhuazhuzai: {
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
								  player.addSkill('shenhuazhuzai_endEffects');
								  player.maxHp *= 2;
								  player.update();
								  player.storage.shenhuazhuzai_turns = 0;
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
									  var damage = trigger.num;
									  player.recover(damage);
									},
									sub: true,
								  },
								  endEffects: {
									trigger: { player: "phaseEnd" },
									filter: function (event, player) {
									  return player.storage.shenhuazhuzai;
									},
									forced: true,
									content: function () {
									  player.storage.shenhuazhuzai_turns += 1;
									  if (player.storage.shenhuazhuzai_turns >= 3) {
										player.removeSkill('shenhuazhuzai_damageBoost');
										player.removeSkill('shenhuazhuzai_healOnDamage');
										player.maxHp /= 2;
										player.update();
										player.storage.shenhuazhuzai = false;
										player.removeSkill('shenhuazhuzai_endEffects');
										player.unmarkSkill('shenhuazhuzai');
										player.addMark('shenhua', 1);
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
								ai: {
								  order: 5,
								  result: {
									player: function(player) {
									  return player.hp < player.maxHp / 2 ? 10 : 0;
									}
								  },
								  threaten: 1.2,
								  expose: 0.4,
								}
							},
									  
							qiankunzhen: {
								enable: "phaseUse",
								usable: 1,
								filterTarget: function (card, player, target) {
								  return player != target;
								},
								content: function () {
								  target.damage();
								},
								ai: {
								  order: 9,
								  result: {
									target: function(player, target) {
									  return -1 * (target.hp + target.maxHp);
									}
								  },
								  threaten: 2,
								  expose: 0.4,
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

							
							
						}
					};
					if (lib.device || lib.node) {
						for (var i in aolaxing.character) {
							aolaxing.character[i][4].push("ext:AOLA/img/" + i + ".jpg");
						}
					}
					else {
						for (var i in aolaxing.character) {
							aolaxing.character[i][4].push("db:extension-AOLA/img:" + i + ".jpg");
						}
					}
					return aolaxing;
				});
				lib.config.all.characters.push("aolaxing");
				if (!lib.config.characters.contains("aolaxing")) lib.config.characters.push("aolaxing");
				lib.translate["aolaxing_character_config"] = "AOLA";
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
			intro: "可联机的AOLA武将扩展包，本来是想做明日方舟武将扩展的，于是有了凯尔希，后来还是觉得AOLA的很多角色机制更有趣一点，于是就改成AOLA了。",
			author: "笑纹光",
			diskURL: "",
			forumURL: "",
			version: "1.0.7",
		}, files: { "character": [], "card": [], "skill": [] }
	}
})