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
								奥拉星: ["wumianzhiwang", "liliangwang", "kaltsit", "xihe", "qiankun"],
								其他: []
							}
						},
						character: {
							"wumianzhiwang": ["male", "ao", 3, ["qian", "lvlicaijue"], ["die_audio"]],
							"liliangwang": ["male", "ao", 4, ["lilianghuiyao","wujianchaoying"],["die_audio"]],
							"kaltsit": ["female", "ao","4/4/5", ["mon3ter", "buhui"], ["die_audio"]],
							"xihe": ["female", "ao", 4, ["shiguang", "lishi"], ["die_audio"]],
							"qiankun": ["male", "ao",3, ["shenhuazhuzai", "qiankunzhen"], ["die_audio"]],
						},
						translate: {
							"wumianzhiwang": "无冕之王",
							qian: "潜",
							"qian_info": "每次即将受到伤害时，判定一次，若不为黑桃，则此次伤害降至0。",
							lvlicaijue: "律理裁决",
							"lvlicaijue_info": "自身每次对攻击目标造成伤害后，令其下一回合跳过摸牌和出牌阶段。",

							"kaltsit": "凯尔希",
							mon3ter: "怪物3",
							"mon3ter_info": "出牌阶段，选择3张黑色手牌弃置并令一名其他角色失去2点体力，令自己手牌与护甲+1。",
							buhui: "不毁",
							"buhui_info": "出牌阶段，选择2张红色手牌弃置并回复1点体力，令自己手牌与护甲+1。",

							"liliangwang": "力量王",
							lilianghuiyao: "力量辉耀",
							"lilianghuiyao_info": "受到伤害时，判定一次，黑色体力上限+2，红色体力值+2。",
							wujianchaoying: "无间超影",
							"wujianchaoying_info": "出牌阶段，若当前体力值为双数，可选择消耗一半的体力值，使得本回合内造成的伤害翻倍并解除杀的使用限制。",

							"xihe": "羲和",
							lishi: "离时",
							"lishi_info": "上场立刻触发：所有角色每次回合开始时，增加1个离时标记，若标记数量达到或超过12个，清空标记。羲和清空标记时增加体力上限并回满体力值，其他角色则直接死亡。",
							shiguang: "时光",
							"shiguang_info": "场上每当有人受伤后，判定一次，若为黑桃，受伤者离时标记+6，否则离时标记+1。",

							"qiankun": "乾坤",
							shenhuazhuzai: "神化主宰",
							"shenhuazhuzai_info": "觉醒技，回合开始时，可选择令自身本回合停止行动，从而进入3回合的神化状态：体力上限翻倍，攻击造成的伤害+1，且等额回复",
							qiankunzhen: "乾坤震",
							"qiankunzhen_info": "直接对目标造成一点伤害，出牌阶段限一次。",

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
								trigger: { global: "phaseBefore" },
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
											current.recover(current.maxHp - current.hp);
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
								trigger: { global: "damageEnd" },
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
									// 确保触发者不是自己，并且目标受到实际伤害（不是护盾吸收的伤害）
									return event.player != player && event.num > 0 && event.player.hp < event.player.maxHp;
								},
								direct: true,
								content: function() {
									var target = trigger.player;
									target.addSkill("lvlicaijue_stop");
								},
								subSkill: {
									stop: {
										trigger: { player: "phaseBegin" },
										content: function() {
											player.skip("phaseDraw");
											player.skip("phaseUse");
											player.removeSkill("lvlicaijue_stop");
										},
										sub: true,
										forced: true,
									}
								},
							},
														
							lilianghuiyao: {
								trigger: { player: "damageEnd" },
								forced: true,
								content: function() {
									'step 0'
									player.judge(function(card) {
										return get.color(card);
									});
									'step 1'
									if (result.color == 'black') {
										player.maxHp += 2;
										player.update();
										game.log(player, '的体力上限增加了2');
									} else if (result.color == 'red') {
										var recoverAmount = Math.floor(player.maxHp / 2);
										player.recover(recoverAmount);
										game.log(player, '恢复了', recoverAmount, '点体力');
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
											targetInRange: function(card) {
												if (card.name == 'sha') return true;
											},
											cardUsable: function(card, player, num) {
												if (card.name == 'sha') return Infinity;
											},
										},
										sub: true,
									},
								},
							},
							
										
							mon3ter: {
								trigger: { player: 'phaseUse' },
								direct: true,
								filter: function(event, player) {
									return player.countCards('h', { color: 'black' }) >= 3;
								},
								content: function() {
									'step 0'
									player.chooseCard('选择3张黑色手牌弃置并令一名其他角色失去2点体力，自己摸1张牌并增加1点护甲', 3, { color: 'black' }).set('ai', function(card) {
										return 6 - get.value(card);
									});
									'step 1'
									if (result.bool) {
										player.logSkill('mon3ter');
										player.discard(result.cards);
										player.chooseTarget('选择一名角色令其失去2点体力', function(card, player, target) {
											return player != target;
										}).set('ai', function(target) {
											return -get.attitude(player, target);
										});
									}
									'step 2'
									if (result.bool) {
										result.targets[0].loseHp(2);
										player.draw();
										player.changeHujia(1);
									}
								}
							},
							buhui: {
								trigger: { player: 'phaseUse' },
								direct: true,
								filter: function(event, player) {
									return player.countCards('h', { color: 'red' }) >= 2;
								},
								content: function() {
									'step 0'
									player.chooseCard('选择2张红色手牌弃置并回复1点体力，摸1张牌并增加1点护甲', 2, { color: 'red' }).set('ai', function(card) {
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
								}
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
				game.import("card", function () {
					var aolaxing = {
						name: "aolaxing",
						connect: true,
						card: {
							"xieli_tongchou": {
								fullskin: true
							},
							"xieli_bingjin": {
								fullskin: true
							},
							"xieli_shucai": {
								fullskin: true
							},
							"xieli_luli": {
								fullskin: true
							}
						},
						skill: {
							xieli: {
								trigger: {
									global: ['phaseEnd', 'die'],
								},
								forced: true,
								charlotte: true,
								priority: 1,
								onremove: function (player) {
									delete player.storage.xieli;
									var skills = ['xieli_tongchou', 'xieli_bingjin', 'xieli_shucai', 'xieli_luli'];
									for (var skill of skills) {
										if (!player.storage[skill]) continue;
										player.removeSkill(skill);
									}
								},
								filter: function (event, player) {
									return player.storage.xieli.contains(event.player);
								},
								content: function () {
									'step 0'
									player.storage.xieli.splice(player.storage.xieli.indexOf(trigger.player), 1);
									var skills = ['xieli_tongchou', 'xieli_bingjin', 'xieli_shucai', 'xieli_luli'];
									for (var skill of skills) {
										if (!player.storage[skill]) continue;
										for (var i = player.storage[skill].length - 1; i >= 0; i--) {
											var info = player.storage[skill][i];
											if (info.player == trigger.player) {
												if (info.bool == false) {
													game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(trigger.player) + '</span>协力' + get.translation(skill), '#y失败');
												}
												player.storage[skill].splice(i, 1);
											}
										}
										if (player.storage[skill].length == 0) {
											player.removeSkill(skill);
										}
										else player.markSkill(skill);
									}
								},
								subSkill: {
									tongchou: {
										priority: 1,
										mark: true,
										trigger: { global: 'damageSource' },
										charlotte: true,
										forced: true,
										popup: false,
										init: function (player, skill) {
											if (!player.storage[skill]) player.storage[skill] = [];
										},
										onremove: function (player) {
											var skill = 'xieli_tongchou';

											if (player.storage[skill]) delete player.storage[skill];
										},
										intro: {
											content: function (storage, player) {
												var str = '';
												for (var i = 0; i < player.storage.xieli_tongchou.length; i++) {
													var bool_str = storage[i].bool ? '<span class="greentext">成功</span>' : '';
													var skill_str = '<span class="greentext">【' + get.translation(storage[i].skill) + '】</span>';
													str += '与<span class="bluetext">' + get.translation(storage[i].player) + '</span>' + skill_str + '<span class=firetext>同仇</span>'
														+ bool_str
														+ '，共造成' + get.cnNumber(storage[i].data) + '点伤害<br>';
												}
												return str.slice(0, str.length - '<br>'.length);
											},
										},
										filter: function (event, player) {
											if (event.source == player) return true;
											for (var i = 0; i < player.storage.xieli_tongchou.length; i++) {
												if (event.num > 0 && (event.source == player.storage.xieli_tongchou[i].player)) return true;
											}
											return false
										},
										content: function () {
											'step 0'
											var skill = 'xieli_tongchou';

											if (trigger.source == player) {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													info.data += trigger.num;
													if (info.data >= 4 && info.bool == false) {
														info.bool = true;
														if (!player.storage.xieli) player.storage.xieli = [];
														player.storage.xieli.push(info.skill);
														game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
														event.trigger('xieli_achieve');
													}

												}
											}
											else {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													if (info.player == trigger.source) {
														info.data += trigger.num;
														if (info.data >= 4 && info.bool == false) {
															info.bool = true;
															if (!player.storage.xieli) player.storage.xieli = [];
															player.storage.xieli.push(info.skill);
															game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
															event.trigger('xieli_achieve');
														}
													} else continue;
												}
											}
											player.markSkill(skill);
										},
									},
									bingjin: {
										priority: 1,
										mark: true,
										trigger: { global: 'drawAfter' },
										charlotte: true,
										forced: true,
										popup: false,
										init: function (player, skill) {
											if (!player.storage[skill]) player.storage[skill] = [];
										},
										onremove: function (player) {
											var skill = 'xieli_bingjin';
											if (player.storage[skill]) delete player.storage[skill];
										},
										intro: {
											content: function (storage, player) {
												var str = '';
												for (var i = 0; i < player.storage.xieli_bingjin.length; i++) {
													var bool_str = storage[i].bool ? '<span class="greentext">成功</span>' : '';
													var skill_str = '<span class="greentext">【' + get.translation(storage[i].skill) + '】</span>';
													str += '与<span class="bluetext">' + get.translation(storage[i].player) + '</span>' + skill_str + '<span class=firetext>并进</span>'
														+ bool_str
														+ '，共摸了' + get.cnNumber(storage[i].data) + '张牌<br>';
												}
												return str.slice(0, str.length - '<br>'.length);
											},
										},
										filter: function (event, player) {
											if (event.player == player) return true;
											for (var i = 0; i < player.storage.xieli_bingjin.length; i++) {
												if (event.player == player.storage.xieli_bingjin[i].player) return true;
											}
											return false;
										},
										content: function () {
											'step 0'
											var skill = 'xieli_bingjin';
											if (trigger.player == player) {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													info.data += trigger.result.length;
													if (info.data >= 8 && info.bool == false) {
														info.bool = true;
														if (!player.storage.xieli) player.storage.xieli = [];
														player.storage.xieli.push(info.skill);
														game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
														event.trigger('xieli_achieve');
													}

												}
											}
											else {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													if (info.player == trigger.player) {
														info.data += trigger.result.length;
														if (info.data >= 8 && info.bool == false) {
															info.bool = true;
															if (!player.storage.xieli) player.storage.xieli = [];
															player.storage.xieli.push(info.skill);
															game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
															event.trigger('xieli_achieve');
														}
													} else continue;
												}
											}
											player.markSkill(skill);
										},
									},
									shucai: {
										priority: 1,
										mark: true,
										trigger: { global: 'loseAfter' },
										charlotte: true,
										forced: true,
										popup: false,
										init: function (player, skill) {
											if (!player.storage[skill]) player.storage[skill] = [];
										},
										onremove: function (player) {
											var skill = 'xieli_shucai';
											if (player.storage[skill]) delete player.storage[skill];
										},
										intro: {
											content: function (storage, player) {
												var str = '';
												for (var i = 0; i < player.storage.xieli_shucai.length; i++) {
													var bool_str = storage[i].bool ? '<span class="greentext">成功</span>' : '';
													var skill_str = '<span class="greentext">【' + get.translation(storage[i].skill) + '】</span>';
													str += '与<span class="bluetext">' + get.translation(storage[i].player) + '</span>' + skill_str + '<span class=firetext>疏财</span>'
														+ bool_str
														+ '，共弃置了' + get.translation(storage[i].data) + '<br>';
												}
												return str.slice(0, str.length - '<br>'.length);
											},
										},
										filter: function (event, player) {
											if (event.type != 'discard') return false;
											var flags = false;
											for (var i = 0; i < event.cards2.length; i++) {
												var suit = get.suit(event.cards2[i], event.player);
												if (suit != 'none' && suit != undefined) {
													flags = true; break;
												}
											}
											if (!flags) return false;
											if (event.player == player) return true;
											for (var i = 0; i < player.storage.xieli_shucai.length; i++) {
												if (event.player == player.storage.xieli_shucai[i].player && !player.storage.xieli_shucai[i].bool) return true;
											}
											return false;
										},
										content: function () {
											'step 0'
											var skill = 'xieli_shucai';
											var suits = [];
											for (var i = 0; i < trigger.cards2.length; i++) {
												var suit = get.suit(trigger.cards2[i], trigger.player);
												if (suit != 'none' && suit != undefined && !suits.contains(suit)) {
													suits.push(suit);
												}
											}
											if (trigger.player == player) {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													for (var suit of suits) {
														if (!info.data.contains(suit)) info.data.push(suit);
													}
													info.data.sort();
													if (info.data.length == 4 && info.bool == false) {
														info.bool = true;
														if (!player.storage.xieli) player.storage.xieli = [];
														player.storage.xieli.push(info.skill);
														game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
														event.trigger('xieli_achieve');
													}

												}
											}
											else {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													if (info.player == trigger.player) {
														for (var suit of suits) {
															if (!info.data.contains(suit)) info.data.push(suit);
														}
														info.data.sort();
														if (info.data.length == 4 && info.bool == false) {
															info.bool = true;
															if (!player.storage.xieli) player.storage.xieli = [];
															player.storage.xieli.push(info.skill);
															game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
															event.trigger('xieli_achieve');
														}
													} else continue;
												}
											}
											player.markSkill(skill);
										},
									},
									luli: {
										priority: 1,
										mark: true,
										trigger: { global: ['useCard', 'respond'] },
										charlotte: true,
										forced: true,
										popup: false,
										init: function (player, skill) {
											if (!player.storage[skill]) player.storage[skill] = [];
										},
										onremove: function (player) {
											var skill = 'xieli_luli';
											if (player.storage[skill]) delete player.storage[skill];
										},

										intro: {
											content: function (storage, player) {
												var str = '';
												for (var i = 0; i < player.storage.xieli_luli.length; i++) {
													var bool_str = storage[i].bool ? '<span class="greentext">成功</span>' : '';
													var skill_str = '<span class="greentext">【' + get.translation(storage[i].skill) + '】</span>';
													str += '与<span class="bluetext">' + get.translation(storage[i].player) + '</span>' + skill_str + '<span class=firetext>勠力</span>'
														+ bool_str
														+ '，使用或打出了' + get.translation(storage[i].data) + '<br>';
												}
												return str.slice(0, str.length - '<br>'.length);
											},
										},
										filter: function (event, player) {
											if (get.suit(event.card, event.player) != 'none' && get.suit(event.card, event.player)) {
												if (event.player == player) return true;
												for (var i = 0; i < player.storage.xieli_luli.length; i++) {
													if (event.player == player.storage.xieli_luli[i].player && !player.storage.xieli_luli[i].bool) return true;
												}
											}
											return false;
										},
										content: function () {
											'step 0'
											var skill = 'xieli_luli';
											var suits = [];

											suits = [get.suit(trigger.card, trigger.player)];
											if (trigger.player == player) {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													for (var suit of suits) {
														if (!info.data.contains(suit)) info.data.push(suit);
													}
													info.data.sort();
													if (info.data.length == 4 && info.bool == false) {
														info.bool = true;
														if (!player.storage.xieli) player.storage.xieli = [];
														player.storage.xieli.push(info.skill);
														game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
														event.trigger('xieli_achieve');
													}

												}
											}
											else {
												for (var i = 0; i < player.storage[skill].length; i++) {
													var info = player.storage[skill][i];
													if (info.player == trigger.player) {
														for (var suit of suits) {
															if (!info.data.contains(suit)) info.data.push(suit);
														}
														info.data.sort();
														if (info.data.length == 4 && info.bool == false) {
															info.bool = true;
															if (!player.storage.xieli) player.storage.xieli = [];
															player.storage.xieli.push(info.skill);
															game.log('<span class="bluetext">' + get.translation(player) + '</span>与<span class="bluetext">' + get.translation(info.player) + '</span>协力' + get.translation(skill), '#g成功');
															event.trigger('xieli_achieve');
														}
													} else continue;
												}
											}
											player.markSkill(skill);
										},
									},
								}
							},
							xieli_tongchou: {
								fullimage: true,
								image: 'ext:奥拉星/xieli_tongchou.png',
							},
							xieli_bingjin: {
								fullimage: true,
								image: 'ext:奥拉星/xieli_bingjin.png',
							},
							xieli_shucai: {
								fullimage: true,
								image: 'ext:奥拉星/xieli_shucai.png'
							},
							xieli_luli: {
								fullimage: true,
								image: 'ext:奥拉星/xieli_luli.png'
							}
						},
						translate: {
							xieli: '协力',
							xieli_tongchou: '同仇',
							xieli_bingjin: '并进',
							xieli_shucai: '疏财',
							xieli_luli: '勠力',
							xieli_tongchou_info: '你与其造成的伤害之和不小于4点',
							xieli_bingjin_info: '你与其摸牌数之和不小于8张',
							xieli_shucai_info: '你与其弃置的牌包含4种花色',
							xieli_luli_info: '你与其使用或打出的牌包含4种花色',
						},
						lishit: []
					};
					for (var i in aolaxing.card) {
						aolaxing.card[i].image = ("ext:奥拉星/" + i + ".png");
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
			intro: "来自萌新潜水群的扩展更新，潜水群QQ: 740019074，能力有限，仅在潜水群回答问题。",
			author: "潜水群",
			diskURL: "",
			forumURL: "",
			version: "1.0.0",
		}, files: { "character": [], "card": [], "skill": [] }
	}
})