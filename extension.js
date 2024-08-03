game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "谋攻篇", content: function (config, pack) {
			lib.rank.rarity.legend.push("mou_huangzhong");
			lib.rank.rarity.legend.push("kaltsit");
			lib.rank.rarity.legend.push("ck_caomao");
			lib.rank.rarity.legend.push("diy_huangwudie");
			lib.rank.rarity.rare.push("mou_sunquan");
			lib.rank.rarity.rare.push("mou_huaxiong");
			lib.rank.rarity.rare.push("mou_lvmeng");
			lib.rank.rarity.epic.push("tw_zhangrang");
		}, precontent: function (ext) {
			if (ext.enable) {
				game.import("character", function () {
					var mougong = {
						name: "mougong",
						connect: true,
						characterSort: {
							谋攻篇: {
								谋攻篇: ["wumianzhiwang", "mou_huangzhong", "kaltsit", "mou_machao", "mou_huaxiong", "mou_xuhuang", "mou_sunshangxiang", "mou_sunquan", "mou_lvmeng", "mou_yujin", "mou_zhangfei"],
								其他: []
							}
						},
						character: {
							"wumianzhiwang": ["male", "shu", 3, ["qian", "lvlicaijue"], ["die_audio"]],
							"mou_huangzhong": ["male", "shu", 4, ["mouliegong"], ["die_audio"]],
							"kaltsit": ["female", "qun", 4, ["mon3ter", "buhui"], ["die_audio"]],
							"mou_machao": ["male", "shu", 4, ["mashu", "moutieqi"], ["die_audio"]],
							"mou_huaxiong": ["male", "qun", "4/4/5", ["mouyaowu", "mouyangwei"], ["die_audio"]],
							"mou_xuhuang": ["male", "wei", 4, ["mouduanliang", "shipo"], ["die_audio"]],
							"mou_sunshangxiang": ["female", "shu", 4, ["mouliangzhu", "moufanxiang", "mouxiaoji"], ["doublegroup:shu:wu", "die_audio"]],
							"mou_sunquan": ["male", "wu", 4, ["mouzhiheng", "moutongye", "moujiuyuan"], ["zhu", "die_audio"]],
							"mou_lvmeng": ["male", "wu", 4, ["moukeji", "moudujiang"], ["die_audio"]],
							"mou_yujin": ["male", "wei", 4, ["mouxiayuan", "moujieyue"], ["die_audio"]],
							"mou_zhangfei": ["male", "shu", 4, ["mou_paoxiao", "newxieji"], ["die_audio"]]
						},
						translate: {
							"wumianzhiwang": "无冕之王",
							"kaltsit": "凯尔希",
							"mou_huangzhong": "谋黄忠",
							"mou_machao": "谋马超",
							"mou_huaxiong": "谋华雄",
							"mou_xuhuang": "谋徐晃",
							"mou_sunshangxiang": "谋孙尚香",
							"mou_sunquan": "谋孙权",
							"mou_lvmeng": "谋吕蒙",
							"mou_yujin": "谋于禁",
							"mou_zhangfei": "谋张飞",
							qian: "qian",
							"qian_info": "每次即将受到伤害时，判定一次，若不为黑桃，则此次伤害降至0。",
							lvlicaijue: "律理裁决",
							"lvlicaijue_info": "自身每次对攻击目标造成伤害后，令其下一回合跳过摸牌和出牌阶段。",
							mon3ter: "怪物3",
							"mon3ter_info": "出牌阶段，你可以选择3张黑色手牌，将其全部弃掉，并令一名其他角色直接失去2点体力，同时自己摸1张牌。",
							buhui: "不毁",
							"buhui_info": "出牌阶段，你可以选择2张红色手牌，将其弃全部掉，令自身回复1点体力并摸1张牌。",
							mouzhiheng: "制衡",
							"mouzhiheng_info": "出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌，若你弃置了所有手牌，则额外摸X十1张牌（X为你拥有的“业”标记数量），然后移除一个“业”。",
							moutongye: "统业",
							"moutongye2": "统业",
							"moutongye3": "统业",
							"moutongye_info": "锁定技，结束阶段，你须选择一项，直到下回合准备阶段：1. 若场上的装备数变化，则你获得一个“业”，否则失去一个“业”；2. 若场上的装备数不变，则你获得一个“业”，否则失去一个“业”。你最多拥有2个“业”。",
							moujiuyuan: "救援",
							"moujiuyuan_info": "主公技，锁定技，①当其他吴势力角色使用【桃】时，你摸一张牌；②当其他吴势力角色对你使用【桃】时，此牌对你的回复值+1。",
							mouliegong: "烈弓",
							"mouliegong_info": "你使用【杀】可选择在此【杀】点数距离内的角色为目标。你使用牌时或成为其他角色使用牌的目标后，若此牌的花色未被“烈弓”记录，则记录此花色。当你使用【杀】指定唯一目标后，你可以展示牌堆顶的X张牌（X为你记录的花色数-1，且至少为0），每有一张牌花色与“烈弓”记录的花色相同，你令此【杀】伤害+1，且其不能使用“烈弓”记录花色的牌响应此【杀】。若如此做，此【杀】结算结束后，清除“烈弓”记录的花色。",
							"mouliegong3": "烈弓",
							"mouliegong3_info": "",
							moutieqi: "铁骑",
							"moutieqi_info": "当你使用【杀】指定一名角色为目标后，你可以令该角色的非锁定技失效直到回合结束且其不能使用【闪】抵消此【杀】，然后你与该角色进行“谋弈”：<br>直取敌营：你获得其一张牌。<br>扰阵疲敌：你摸两张牌。",
							mouduanliang: "断粮",
							"mouduanliang_info": "出牌阶段限两次，你可以与一名其他角色进行“谋弈”：<br>围城断粮：若其判定区有【兵粮寸断】，获得其一张牌，否则你将一张牌堆顶的牌当做【兵粮寸断】对其使用且无距离限制。<br>擂鼓进军：你视为对其使用一张【决斗】。",
							shipo: "势迫",
							"shipo_info": "结束阶段，你可以令一名体力值小于你的角色或所有判定区中有【兵粮寸断】的其他角色选择一项：1.交给你一张手牌；2.受到1点伤害。若你以此法获得了牌，你可以将其中任意张牌交给一名其他角色。",
							mouyangwei: "扬威",
							"mouyangwei_info": "出牌阶段限一次，你可以摸两张牌并获得“威”标记直到此阶段结束，然后此技能失效直到下个回合的结束阶段。拥有“威”标记的角色出牌阶段可额外使用一张【杀】、使用【杀】无距离限制且无视防具。",
							"mouyangwei2": "扬威",
							"mouyangwei2_info": "",
							"mouyangwei3": "扬威",
							"mouyangwei3_info": "",
							"mouyangwei_sha": "扬威",
							"mouyangwei_sha_info": "",
							"mouliegong2": "烈弓",
							"mouliegong2_info": "",
							"mouliegong4": "烈弓",
							"mouliegong4_info": "",
							mouyaowu: "耀武",
							"mouyaowu_info": "锁定技，当你受到牌造成的伤害时，若此牌为红色，则伤害来源摸一张牌；否则你摸一张牌。",
							mouxiayuan: "挟援",
							"mouxiayuan_info": "每轮限一次，拥有护甲的一名其他角色受到伤害后，若其因此失去了所有护甲，你可以弃置两张手牌并令其获得原先护甲值的护甲。",
							moujieyue: "节钺",
							"moujieyue_info": "结束阶段，你可以选择一名其他角色，其获得一点护甲，摸两张牌，然后交给你两张牌。",
							moukeji: "克己",
							"moukeji_backup": "克己",
							"moukeji_info": "出牌阶段限一次，你可以选择一项执行对应效果：1. 弃置一张手牌，获得1点护甲；2. 流失1点体力，获得2点护甲。然后若此时场上存活人数不小于5，则你可以执行另一项。你的手牌上限+X（X为你的护甲值）。若你不处于濒死状态，你无法使用【桃】。",
							moudujiang: "渡江",
							"moudujiang_info": "觉醒技，准备阶段，若你的护甲值不小于三，你获得技能〖夺荆〗。",
							mouduojing: "夺荆",
							"mouduojing_info": "当你使用【杀】指定目标后，你可以失去一点护甲，令此杀不计入次数限制并无视其防具，然后你获得其一张牌。",
							"moukeji1": "克己",
							"moukeji1_info": "",
							"moukeji0": "克己",
							"moukeji0_info": "",
							"moujiuyuan2": "救援",
							"moujiuyuan2_info": "",
							"moutongye2_info": "",
							"mouyangwei4": "扬威",
							"mouyangwei4_info": "",
							moupaoxiao: "咆哮",
							"moupaoxiao_info": "锁定技，你使用【杀】无次数限制。若你装备了武器，你使用【杀】无距离限制。你的出牌阶段，若你于当前阶段内使用过【杀】，你于此阶段使用【杀】指定的目标本回合非锁定技失效，且此【杀】不可被响应且伤害值+1，此【杀】造成伤害后若目标角色未死亡，你失去1点体力并随机弃置一张手牌。",
							mouxieji: "协击",
							newxieji: "协击",
							"mouxieji_info": "准备阶段，你可以选择一名其他角色，其回合结束时，若你与其在此期间造成的伤害值相等，你与其各摸两张牌，且直至你的下一回合结束前，你使用【杀】造成的伤害+1。",
							"newxieji_info": "准备阶段，你可以选择一名其他角色，与其进行“协力”。其结束阶段，若你与其“协力”成功，则你可以选择至多三名角色，依次视为对其使用一张【杀】，你用此【杀】造成伤害后，摸等同于此【杀】造成伤害数的牌。",
							"mou_paoxiao": "咆哮",
							"mou_paoxiao_info": "锁定技，你使用【杀】无次数限制。若你装备了武器，你使用【杀】无距离限制。你的出牌阶段，若你于当前阶段内使用过【杀】，你于此阶段使用【杀】指定的目标本回合非锁定技失效，且此【杀】不可被响应且伤害值+1，此【杀】造成伤害后若目标角色未死亡，你失去1点体力并随机弃置一张手牌。",
							"mou_paoxiao2": "咆哮",
							"mou_paoxiao2_info": "",
							mouliangzhu: "良助",
							"mouliangzhu_info": "蜀势力技，出牌阶段限一次，你可以获得其他角色装备区的一张牌，将其置于你的武将牌上，称为“妆”，然后令拥有“助”的角色选择一项：1. 回复1点体力值；2. 摸一张牌。",
							moufanxiang: "返乡",
							"moufanxiang_info": "使命技，你的登场势力为“蜀”。游戏开始时，你选择一名角色令其获得“助”。出牌阶段开始时，有“助”的角色须选择一项：1. 若其有手牌，交给你两张手牌（若其手牌不足两张则交给你所有手牌）；2. 令你使命失败。失败：你将势力修改为“吴”、回复1点体力并获得你武将牌上所有“妆”牌，弃掉场上的“助”，减1点体力上限。",
							"mou_zhuang": "妆",
							mouxiaoji: "枭姬",
							"mouxiaoji_info": "吴势力技，当你失去装备区里的一张牌时，你摸两张牌，然后可以弃置场上一张牌。",

						},
						skill: {
							_dieAudioMOU: {
								trigger: { global: 'dieBegin', },
								priority: 2,
								forced: true,
								unique: true,
								frequent: true,
								content: function () {
									if (trigger.player.name) game.playAudio('..', 'extension', '谋攻篇', trigger.player.name);
								}
							},
							qian: {
								trigger: { player: "damageBegin" },
								forced: true,  // 强制触发
								content: function() {
									'step 0'
									player.judge(function(card) {
										if (get.suit(card) == 'spade') return -1;
										return 1;
									});
									'step 1'
									if (result.bool == true) {
										trigger.num = 0;
									}
								},
							},
							
							lvlicaijue: {
                                trigger: { source: "damageEnd" },
                                filter: function(event, player) {
                                    return event.player != player;  
                                },
                                direct: true,
                                content: function() {
                                    trigger.player.addSkill("lvlicaijue_temp");
                                },
                                subSkill: {
                                    temp: {
                                        trigger: { player: "phaseBegin" },
                                        silent: true,
                                        content: function() {
                                            player.skip("phaseDraw");
                                            player.skip("phaseUse");
                                            player.removeSkill("lvlicaijue_temp");
                                        },
                                        sub: true,
                                        forced: true,
                                        popup: false,
                                        _priority: 1
                                    }
                                },
                                _priority: 0
                            },
							newxieji: {
								audio: "ext:谋攻篇:2",
								trigger: {
									player: "phaseZhunbeiBegin",
								},
								direct: true,
								init: function (player) {
									player.storage.newxieji = false;
								},
								content: function () {
									'step 0'
									player.chooseTarget(get.prompt('newxieji'), '与一名其他角色协同作战', lib.filter.notMe).set('ai', function (target) {
										var player = _status.event.player;
										return get.attitude(player, target);
									});
									'step 1'
									if (result.bool) {
										event.target = result.targets[0];
										player.chooseButton([get.prompt('newxieji'), [['xieli_tongchou', 'xieli_bingjin', 'xieli_shucai', 'xieli_luli'], 'vcard']]);
									}
									'step 2'
									if (result.bool) {
										player.logSkill('newxieji', event.target);
										var target = event.target;
										var name = result.links[0][2];
										//new_xieli
										if (!player.storage[name]) player.storage[name] = [];
										if (['xieli_tongchou', 'xieli_bingjin'].contains(name)) {
											var info = { player: target, skill: 'newxieji', data: 0, bool: false };
										} else {
											var info = { player: target, skill: 'newxieji', data: [], bool: false };
										}
										player.storage[name].push(info);
										player.addTempSkill(name, { player: 'phaseBefore' });
										if (!player.storage.xieli) player.storage.xieli = [];
										if (!player.storage.xieli.contains(target)) player.storage.xieli.push(target);
										player.addTempSkill('xieli', { player: 'phaseBefore' });
										// old_xieli
										/*
										if (!target.storage[name]) target.storage[name] = {};
										if (!player.storage[name]) player.storage[name] = {};
										if (['xieli_tongchou', 'xieli_bingjin'].contains(name)) {
											target.storage[name][player.playerid] = { data: [0], bool: false };
											player.storage[name][target.playerid] = { data: [0], bool: false };
										}
										else {
											target.storage[name][player.playerid] = { data: [], bool: false };
											player.storage[name][target.playerid] = { data: [], bool: false };
										}
		
										if (!player.storage.xieli) player.storage.xieli = [];
										if (!player.storage.xieli.contains(name)) player.storage.xieli.push(name);
										player.addTempSkill('xieli', { player: 'phaseBefore' });
										player.addTempSkill(name, { player: 'phaseBefore' });
										target.addTempSkill(name, { player: 'phaseAfter' });
										*/
									}
								},
								group: ["newxieji_hezuo"],
								subSkill: {
									hezuo: {
										audio: "ext:谋攻篇:newxieji",
										trigger: {
											player: "xieli_achieve",
										},
										forced: true,
										filter: function (event, player) {
											return player.storage.xieli.contains('newxieji');
										},
										content: function () {
											'step 0'
											player.storage.xieli.splice(player.storage.xieli.indexOf('newxieji'), 1);
											var prompt = '可以选择至多三名角色，依次视为对其使用一张【杀】，你用此【杀】造成伤害后，摸等同于此【杀】造成伤害数的牌。';
											player.chooseTarget(false, prompt, [1, 3], lib.filter.notMe).set('ai', function (target) {
												var player = _status.event.player;
												return -get.attitude(player, target);
											});
											'step 1'
											if (result.bool) {
												player.useCard({ name: 'sha', isCard: false }, result.targets, false);
												player.addTempSkill('newxieji_draw');
											}
											game.delayx();
										},
										sub: true,
									},
									draw: {
										trigger: {
											source: "damageSource",
										},
										forced: true,
										charlotte: true,
										filter: function (event, player) {
											return event.getParent(3).name == 'newxieji_hezuo' && event.card.name == 'sha';
										},
										content: function () {
											player.draw(trigger.num);
										},
										sub: true,
									},
								},
							},
							mon3ter: {
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                filter: function(event, player) {
                                    return player.countCards('h', {color: 'black'}) >= 3;
                                },
                                content: function() {
                                    "step 0"
                                    player.chooseCard('选择3张黑色手牌弃置并令一名其他角色失去2点体力，自己摸1张牌', 3, {color: 'black'}).set('ai', function(card) {
                                        return 6 - get.value(card);
                                    });
                                    "step 1"
                                    if(result.bool) {
                                        player.logSkill('mon3ter');
                                        player.discard(result.cards);
                                        player.chooseTarget('选择一名角色令其失去2点体力', function(card, player, target) {
                                            return player != target;
                                        }).set('ai', function(target) {
                                            return -get.attitude(player, target);
                                        });
                                    }
                                    else {
                                        event.finish();
                                    }
                                    "step 2"
                                    if(result.bool) {
                                        result.targets[0].loseHp(2);
                                        player.draw();
                                    }
                                },
                            },
							buhui: {
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                filter: function(event, player) {
                                    return player.countCards('h', {color: 'red'}) >= 2;
                                },
                                content: function() {
                                    "step 0"
                                    player.chooseCard('选择2张红色手牌弃置并回复1点体力摸1张牌', 2, {color: 'red'}).set('ai', function(card) {
                                        return 6 - get.value(card);
                                    });
                                    "step 1"
                                    if(result.bool) {
                                        player.logSkill('buhui');
                                        player.discard(result.cards);
                                        player.recover();
                                        player.draw();
                                    }
                                },
                            },
							mouxiayuan: {
								audio: "ext:谋攻篇:2",
								trigger: {
									global: "clearHujia",
								},
								filter: function (event, player) {
									if (player.countCards('h') < 2 || event.player == player || player.hasSkill('mouxiayuan_silent')) return false;
									return event.type == 'damage';
								},
								direct: true,
								content: function () {
									'step 0'
									player.chooseCard(get.prompt('mouxiayuan', trigger.player), '弃置两张手牌并令' + get.translation(trigger.player) + '恢复' + get.cnNumber(trigger.player.LastHujia) + '点护甲', 'h', 2).set('ai', function (card) {
										var player = _status.event.player;
										if (ai.get.attitude(player, _status.event.getTrigger().player) > 3) return 11 - ai.get.value(card);
										return -1;
									});
									'step 1'
									if (result.bool) {
										player.logSkill('mouxiayuan', trigger.player);
										player.discard(result.cards);
										player.addTempSkill('mouxiayuan_silent', 'roundStart');
										trigger.player.changeHujia(trigger.player.LastHujia);
									}
								},
								subSkill: {
									silent: {
										charlotte: true,
										mark: true,
										intro: {
											content: "本轮已发动此技能",
										},
										sub: true,
									},
								},
							},
							moujieyue: {
								audio: "ext:谋攻篇:2",
								trigger: {
									player: "phaseJieshuBegin",
								},
								direct: true,
								content: function () {
									'step 0'
									player.chooseTarget(get.prompt2('moujieyue'), lib.filter.notMe).set('ai', function (target) {
										var player = _status.event.player;
										return get.attitude(player, target) * (5 - target.hujia) * (target.hujia >= 5 ? -0.25 : 1) + (target.hujia == 5 ? get.attitude(player, target) : 0);
									});
									'step 1'
									if (result.bool) {
										var target = result.targets[0];
										player.logSkill('moujieyue', target);
										target.changeHujia(1);
										target.draw(2);
										target.chooseCard('he', 2, true, '节钺：将两张牌交给' + get.translation(player));
										event.target = target;
									}
									'step 2'
									if (result.bool) target.give(result.cards, player, true);
								},
							},
							moukeji: {
								mod: {
									maxHandcard: function (player, num) {
										return num + player.hujia;
									},
									cardEnabled: function (card, player) {
										if (card.name == 'tao' && !player.isDying()) return false;
									},
									cardSavable: function (card, player) {
										if (card.name == 'tao' && !player.isDying()) return false;
									},
								},
								audio: "ext:谋攻篇:2",
								enable: "phaseUse",
								filter: function (event, player) {
									if (game.players.length >= 5) {
										if (!player.hasSkill('moukeji1') && player.countCards('h') > 0) return true;
										if (!player.hasSkill('moukeji0')) return true;
									}
									else {
										if ((!player.hasSkill('moukeji1') && player.countCards('h') > 0) && !player.hasSkill('moukeji0')) return true;
									}
									return false;
								},
								chooseButton: {
									dialog: function (event, player) {
										var list = [
											'弃置一张手牌，获得一点护甲',
											'失去一点体力，获得两点护甲',
										];
										var choiceList = ui.create.dialog('克己：请选择一项', 'hidden');
										for (var i = 0; i < list.length; i++) {
											var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
											var bool = lib.skill.moukeji.chooseButton.filter({ link: i }, player);
											if (!bool) str += '<div style="opacity:0.5">';
											str += list[i];
											if (!bool) str += '</div>';
											str += '</div>';
											var next = choiceList.add(str);
											next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
											next.firstChild.link = i;
											for (var j in lib.element.button) {
												next[j] = lib.element.button[j];
											}
											choiceList.buttons.add(next.firstChild);
										}
										return choiceList;
									},
									check: function (button) {
										var player = _status.event.player;
										if (player.countCards('h') > 0 && !player.hasSkill('moukeji1')) return 2;
										else if (!player.hasSkill('moukeji0')) return 1;
									},
									filter: function (button, player) {
										if (button.link == 0) return !player.hasSkill('moukeji1') && player.countCards('h');
										return !player.hasSkill('moukeji0');
									},
									backup: function (links) {
										return {
											audio: 'moukeji',
											filterCard: true,
											selectCard: 1 - links[0],
											content: function () {
												player.addTempSkill('moukeji' + cards.length, 'phaseUseEnd');
												if (!cards.length) player.loseHp();
												player.changeHujia(cards.length == 1 ? 1 : 2);
											},
										}
									},
									prompt: function () {
										return '选择弃置一张牌'
									},
								},
								ai: {
									order: 10,
									threaten: 8,
									skillTagFilter: function (player) {
										if (player.hujia == 5) return false;
									},
								},
							},
							"moukeji0": {
							},
							"moukeji1": {
							},
							moudujiang: {
								audio: "ext:谋攻篇:2",
								trigger: {
									player: "phaseZhunbeiBegin",
								},
								forced: true,
								juexingji: true,
								skillAnimation: true,
								animationColor: "wood",
								derivation: "mouduojing",
								unique: true,
								filter: function (event, player) {
									return player.hujia >= 3;
								},
								content: function () {
									player.awakenSkill('moudujiang');
									player.addSkillLog('mouduojing');
								},
							},
							mouduojing: {
								audio: "ext:谋攻篇:2",
								trigger: {
									player: "useCardToPlayered",
								},
								filter: function (event, player) {
									return event.card.name == 'sha' && player.hujia > 0;
								},
								check: function (event, player) {
									if (event.target.countCards('he') <= 0) return false;
									return get.attitude(player, event.target) < 0;
								},
								logTarget: "target",
								content: function () {
									'step 0'
									player.changeHujia(-1);
									//game.log(player,'失去了一点护甲');
									trigger.addCount = false;
									if (player.stat[player.stat.length - 1].card.sha > 0) {
										player.stat[player.stat.length - 1].card.sha--;
									}
									trigger.target.addTempSkill('qinggang2');
									trigger.target.storage.qinggang2.add(trigger.card);
									'step 1'
									player.gainPlayerCard(trigger.target, true, 'he');
								},
							},
							mouzhiheng: {
								audio: "ext:谋攻篇:2",
								enable: "phaseUse",
								usable: 1,
								position: "he",
								filterCard: function (card, player, event) {
									event = event || _status.event;
									if (typeof event != 'string') event = event.getParent().name;
									var mod = game.checkMod(card, player, event, 'unchanged', 'cardDiscardable', player);
									if (mod != 'unchanged') return mod;
									return true;
								},
								discard: false,
								lose: false,
								delay: false,
								selectCard: [1, Infinity],
								check: function (card) {
									var player = _status.event.player;
									if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', function (card) {
										return get.value(card) >= 8;
									}))) {
										return 1;
									}
									return 6 - get.value(card)
								},
								content: function () {
									'step 0'
									player.discard(cards);
									if (!player.hasMark('moutongye')) event.num = 1;
									else event.num = 1 + player.countMark('moutongye');
									var hs = player.getCards('h');
									if (!hs.length) event.num = 0;
									for (var i = 0; i < hs.length; i++) {
										if (!cards.contains(hs[i])) {
											event.num = 0; break;
										}
									}
									'step 1'
									player.draw(event.num + cards.length);
									if (event.num > 0) player.removeMark('moutongye', 1)
								},
								ai: {
									order: 1,
									result: {
										player: 1,
									},
									threaten: 3,
								},
							},
							moutongye: {
								trigger: {
									player: "phaseJieshuBegin",
								},
								forced: true,
								marktext: "业",
								audio: "ext:谋攻篇:2",
								intro: {
									name: "业",
									content: "mark",
								},
								content: function () {
									'step 0'
									player.chooseControl().set('prompt', '统业：选择一项').set('choiceList', [
										'若场上的装备数变化，则你获得一个“业”标记，否则失去一个“业”标记',
										'若场上的装备数不变，则你获得一个“业”标记，否则失去一个“业”标记',
									]);
									'step 1'
									if (!player.storage.moutongye2) player.storage.moutongye2 = [];
									player.storage.moutongye2.push(result.index);
									player.storage.moutongye2.sort();
									player.storage.moutongye_num = game.countPlayer(function (current) {
										return current.countCards('e');
									});
									var str = result.index == 0 ? '#g变化' : '#g不变'
									game.log(player, '选择装备数', str);
									'step 2'
									player.addSkill('moutongye3');
									if (result.index == 0) {
										player.addTempSkill('moutongye_bian', { player: 'phaseBegin' });
										player.storage.moutongye_bian = 0;
									}
									if (result.index == 1) {
										player.addTempSkill('moutongye_bubian', { player: 'phaseBegin' });
										player.storage.moutongye_bubian = 0;
									}

								},
								subSkill: {
									bian: {
										trigger: {
											global: ["loseAfter", "cardsDiscardAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter"],
										},
										charlotte: true,
										silent: true,
										mark: true,
										marktext: "变化",
										intro: {
											name: "变化",
											content: "装备变化#",
										},
										onremove: function (player) {
											delete player.storage.moutongye_bian;
											delete player.storage.moutongye_last;
										},
										filter: function (event, player) {
											var flags = false;
											if (Array.isArray(event.cards)) {
												for (var i of event.cards) {
													if (get.type(i) == 'equip') { flags = true; break; }
												}
											}
											if (flags == false) return false;
											// return true;
											var num1 = game.countPlayer(function (current) {
												return current.countCards('e');
											});

											return num1 != player.storage.moutongye_last;
										},
										content: function () {
											var num1 = game.countPlayer(function (current) {
												return current.countCards('e');
											});
											player.storage.moutongye_last = num1;

											player.storage.moutongye_bian = num1 - player.storage.moutongye_num;
											player.markSkill('moutongye_bian');
										},
									},
									bubian: {
										trigger: {
											global: ["loseAfter", "cardsDiscardAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter"],
										},
										charlotte: true,
										silent: true,
										mark: true,
										marktext: "不变",
										intro: {
											name: "不变",
											content: "装备变化#",
										},
										onremove: function (player) {
											delete player.storage.moutongye_bubian;
											delete player.storage.moutongye_bulast;
										},
										filter: function (event, player) {
											var flags = false;
											if (Array.isArray(event.cards)) {
												for (var i of event.cards) {
													if (get.type(i) == 'equip') { flags = true; break; }
												}
											}
											if (flags == false) return false;
											// return true;
											var num1 = game.countPlayer(function (current) {
												return current.countCards('e');
											});

											return num1 != player.storage.moutongye_bulast;
										},
										content: function () {
											var num1 = game.countPlayer(function (current) {
												return current.countCards('e');
											});
											player.storage.moutongye_bulast = num1;

											player.storage.moutongye_bubian = num1 - player.storage.moutongye_num;
											player.markSkill('moutongye_bubian');
										},
									},
								},
							},
							"moutongye3": {
								trigger: {
									player: "phaseZhunbeiBegin",
								},
								forced: true,
								onremove: function (player) {
									delete player.storage.moutongye2;
									delete player.storage.moutongye_num;
								},
								content: function () {
									'step 0'
									event.num1 = game.countPlayer(function (current) {
										return current.countCards('e');
									});
									event.isChange = event.num1 != player.storage.moutongye_num;
									'step 1'
									for (var index of player.storage.moutongye2) {
										if (index == 0) {
											if (event.isChange && player.countMark('moutongye') < 2) player.addMark('moutongye', 1);
											else if (!event.isChange) player.removeMark('moutongye', 1);
										}
										if (index == 1) {
											if (!event.isChange && player.countMark('moutongye') < 2) player.addMark('moutongye', 1);
											else if (event.isChange) player.removeMark('moutongye', 1);
										}

									}
									player.storage.moutongye2 = [];
									'step 2'
									player.removeSkill('moutongye3');

								},
							},

							"moutongye2": {
								trigger: {
									global: ["loseAfter", "cardsDiscardAfter", "equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter"],
								},
								silent: true,
								filter: function (event, player) {
									var flags = false;
									if (Array.isArray(event.cards)) {
										for (var i of event.cards) {
											if (get.type(i) == 'equip') { flags = true; break; }
										}
									}
									if (flags == false) return false;
									var num1 = game.countPlayer(function (current) {
										return current.countCards('e');
									});

									player.storage.moutongye_bijiao = num1 - player.storage.moutongye_num;
									return (num1 - player.storage.moutongye_num) != 0;

								},
								content: function () {
									'step 0'
									var num1 = game.countPlayer(function (current) {
										return current.countCards('e');
									});
									player.storage.moutongye_num = num1;
									var bool = true;
									for (var index of player.storage.moutongye2) {
										if (index == 0) {
											if (player.storage.moutongye_bijiao > 0 && player.countMark('moutongye') < 4) player.addMark('moutongye', 1);
											else if (player.storage.moutongye_bijiao < 0) player.removeMark('moutongye', 1);
										}
										if (index == 1) {
											if (player.storage.moutongye_bijiao < 0 && player.countMark('moutongye') < 4) player.addMark('moutongye', 1);
											else if (player.storage.moutongye_bijiao > 0) player.removeMark('moutongye', 1);
										}

									}
								},
							},
							moujiuyuan: {
								audio: "ext:谋攻篇:2",
								forced: true,
								zhuSkill: true,
								trigger: {
									target: "taoBegin",
								},
								filter: function (event, player) {
									if (event.player == player) return false;
									if (!player.hasZhuSkill('moujiuyuan')) return false;
									if (event.player.group != 'wu') return false;
									return true;
								},
								content: function () {
									trigger.baseDamage++;
								},
								group: "moujiuyuan2",
							},
							"moujiuyuan2": {
								audio: "jiuyuan",
								zhuSkill: true,
								trigger: {
									global: "taoBegin",
								},
								forced: true,
								filter: function (event, player) {
									return player != event.player && event.player.group == 'wu' &&
										event.getParent().name != 'moujiuyuan' && player.hasZhuSkill('moujiuyuan', event.player)
								},
								content: function () {
									'step 0'
									player.draw();
								},
							},
							mouliegong: {
								audio: "ext:谋攻篇:2",
								marktext: "烈",
								intro: {
									content: function (storage) {
										var str = '记录花色：';
										str += get.translation(storage);
										return str;
									},
								},
								group: ["mouliegong2", "mouliegong4", "mouliegong5"],
								onremove: true,
								shaRelated: true,
								mod: {
									targetInRange: function (card, player, target) {
										if (card.name == 'sha' && typeof get.number(card) == 'number') {
											if (get.distance(player, target) <= get.number(card)) return true;
										}
									},
								},
								trigger: {
									player: "useCardToTargeted",
								},
								logTarget: "target",
								check: function (event, player) {
									// var num = player.getAttackRange();
									return get.attitude(player, event.target) <= -2;
								},
								filter: function (event, player) {
									if (!player.storage.mouliegong) player.storage.mouliegong = [];
									if (player.storage.mouliegong.length <= 0) return false;
									return event.card.name == 'sha' && event.targets.length == 1;
								},
								content: function () {
									'step 0'

									trigger.card.mouliegong = true;
									// var num = player.getAttackRange();
									// var cards = get.cards(Math.min(Math.ceil(num / 2), 5));
									event.num = player.storage.mouliegong.length - 1;
									if (event.num <= 0) {
										game.log(player, '展示0张牌');
										trigger.target.storage.mouliegong3 = player.storage.mouliegong.slice(0);
										trigger.target.addTempSkill('mouliegong3');
										event.finish();
									}
									'step 1'
									var cards = get.cards(Math.max(event.num, 0));

									for (var i = cards.length - 1; i--; i >= 0) {
										ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
									}
									game.updateRoundNumber();
									event.cards = cards;
									player.showCards(cards, get.translation(player) + '对' + get.translation(trigger.target) + '发动了【烈弓】');
									'step 2'
									// var list = [];
									var id = trigger.target.playerid;
									var map = trigger.getParent().customArgs;
									if (!map[id]) map[id] = {};
									if (typeof map[id].extraDamage != 'number') {
										map[id].extraDamage = 0;
									}
									for (var i of cards) {
										// if (player.storage.mouliegong.contains(get.suit(i)) && !list.contains(get.suit(i))) {
										//     list.push(get.suit(i));
										// }
										if (player.storage.mouliegong.contains(get.suit(i))) {
											map[id].extraDamage++;
										}
									}
									trigger.target.storage.mouliegong3 = player.storage.mouliegong.slice(0);
									trigger.target.addTempSkill('mouliegong3');


								},
								ai: {
									"directHit_ai": true,
								},
							},
							"mouliegong3": {
								mod: {
									cardEnabled: function (card, player) {
										if (player.storage.mouliegong3.contains(get.suit(card))) return false;
									},
									cardRespondable: function (card, player) {
										if (player.storage.mouliegong3.contains(get.suit(card))) return false;
									},
								},
								mark: true,
								marktext: "烈弓",
								intro: {
									name: "烈弓",
									content: "不可响应花色：$",
								},
								firstDo: true,
								onremove: true,
								trigger: {
									player: ["damage", "damageCancelled", "damageZero"],
									target: ["shaMiss", "useCardToExcluded"],
								},
								charlotte: true,
								filter: function (event, player) {
									return player.storage.mouliegong3;
								},
								silent: true,
								forced: true,
								popup: false,
								content: function () {
									delete player.storage.mouliegong3;
									player.removeSkill('mouliegong3');
								},
							},
							"mouliegong2": {
								trigger: {
									player: "useCardAfter",
								},
								filter: function (event, player) {
									return event.card.name == 'sha' && event.card.mouliegong == true;
								},
								direct: true,
								content: function () {
									delete player.storage.mouliegong;
									player.unmarkSkill('mouliegong');
								},
							},
							"mouliegong4": {
								trigger: {
									player: "useCard",
								},
								filter: function (event, player) {
									if (!player.storage.mouliegong) player.storage.mouliegong = [];
									return get.suit(event.card) != undefined && get.suit(event.card) != 'none' && !player.storage.mouliegong.contains(get.suit(event.card));
								},
								direct: true,
								content: function () {
									if (!player.storage.mouliegong) player.storage.mouliegong = [];
									player.storage.mouliegong.push(get.suit(trigger.card));
									player.storage.mouliegong.sort();
									player.markSkill('mouliegong');
									player.syncStorage('mouliegong');
								},
							},
							"mouliegong5": {
								trigger: {
									target: "useCardToTarget",
								},
								logTarget: "player",
								filter: function (event, player) {
									if (!player.storage.mouliegong) player.storage.mouliegong = [];
									return get.suit(event.card) != undefined && get.suit(event.card) != 'none' && !player.storage.mouliegong.contains(get.suit(event.card));
								},
								direct: true,
								content: function () {
									if (!player.storage.mouliegong) player.storage.mouliegong = [];
									player.storage.mouliegong.push(get.suit(trigger.card));
									player.storage.mouliegong.sort();
									player.markSkill('mouliegong');
									player.syncStorage('mouliegong');
								},
							},
							moutieqi: {
								audio: "ext:谋攻篇:4",
								shaRelated: true,
								trigger: {
									player: "useCardToPlayered",
								},
								check: function (event, player) {
									return get.attitude(player, event.target) <= 0;
								},
								filter: function (event, player) {
									return event.card.name == 'sha';
								},
								logTarget: "target",
								content: function () {
									'step 0'
									if (!trigger.target.hasSkill('fengyin')) trigger.target.addTempSkill('fengyin');
									trigger.getParent().directHit.add(trigger.target);
									'step 1'
									player.chooseControl('直取敌营', '扰阵疲敌').set('prompt', '谋弈：请选择你的进攻策略').set('ai', function () {
										if (trigger.target.countCards('he') <= 0) return '扰阵疲敌';
										return ['直取敌营', '扰阵疲敌'].randomGet();
									});
									'step 2'
									event.res = result.control;
									trigger.target.chooseControl('直取敌营', '扰阵疲敌').set('prompt', '谋弈：请猜测' + get.translation(player) + '的进攻策略').set('ai', function () {
										if (trigger.target.countCards('he') <= 0) return '扰阵疲敌';
										return ['直取敌营', '扰阵疲敌'].randomGet();
									});
									'step 3'
									var str;
									player.popup(event.res);
									trigger.target.popup(result.control);
									game.log(player, '谋弈', event.res == result.control ? '#y失败' : '#g成功');
									if (event.res != result.control) {
										//game.playAudio('..','extension','谋攻篇','mouduanliang3');
										str = get.translation(player) + '谋弈成功';
									}
									else {
										//game.playAudio('..','extension','谋攻篇','mouduanliang4');
										str = get.translation(trigger.target) + '谋弈成功';
									}
									game.broadcastAll(function (str) {
										var dialog = ui.create.dialog(str);
										dialog.classList.add('center');
										setTimeout(function () {
											dialog.close();
										}, 1000);
									}, str);
									game.delay(2);
									if (event.res == result.control) event.finish();
									'step 4'
									if (event.res == '直取敌营' && trigger.target.countGainableCards(player, 'he') > 0) player.gainPlayerCard(trigger.target, true, 'he');
									if (event.res == '扰阵疲敌') player.draw(2);
								},
								ai: {
									ignoreSkill: true,
									"directHit_ai": true,
									skillTagFilter: function (player, tag, arg) {
										if (tag == 'directHit_ai') return get.attitude(player, arg.target) <= 0;
										if (!arg || arg.isLink || !arg.card || arg.card.name != 'sha') return false;
										if (!arg.target || get.attitude(player, arg.target) >= 0) return false;
										if (!arg.skill || !lib.skill[arg.skill] || lib.skill[arg.skill].charlotte || get.is.locked(arg.skill) || !arg.target.getSkills(true, false).contains(arg.skill)) return false;
									},
								},
							},
							mouduanliang: {
								audio: "ext:谋攻篇:2",
								enable: "phaseUse",
								usable: 2,
								filterTarget: function (card, player, target) {
									return player != target;
								},
								content: function () {
									'step 0'
									player.chooseControl('围城断粮', '擂鼓进军').set('prompt', '谋弈：请选择你的进攻策略').set('ai', function () {
										if (target.hasJudge('bingliang')) return '擂鼓进军';
										return ['围城断粮', '擂鼓进军'].randomGet();
									});
									'step 1'
									event.res = result.control;
									target.chooseControl('围城断粮', '擂鼓进军').set('prompt', '谋弈：请猜测' + get.translation(player) + '的进攻策略').set('ai', function () {
										if (target.hasJudge('bingliang')) return '擂鼓进军';
										return ['围城断粮', '擂鼓进军'].randomGet();
									});
									'step 2'
									var str;
									player.popup(event.res);
									target.popup(result.control);
									game.log(player, '谋弈', event.res == result.control ? '#y失败' : '#g成功');
									if (event.res != result.control) {
										game.playAudio('..', 'extension', '谋攻篇', 'mouduanliang3');
										str = get.translation(player) + '谋弈成功';
									}
									else {
										game.playAudio('..', 'extension', '谋攻篇', 'mouduanliang4');
										str = get.translation(target) + '谋弈成功';
									}
									game.broadcastAll(function (str) {
										var dialog = ui.create.dialog(str);
										dialog.classList.add('center');
										setTimeout(function () {
											dialog.close();
										}, 1000);
									}, str);
									game.delay(2);
									if (event.res == result.control) event.finish();
									'step 3'
									if (event.res == '围城断粮') {
										if (!target.hasJudge('bingliang')) { player.useCard({ name: 'bingliang' }, get.cards(), target); event.finish(); }
										else if (target.countCards('he') > 0) event.goto(4);
										else event.finish();
									}
									else { player.useCard({ name: 'juedou', isCard: true }, target, false); event.finish(); }
									'step 4'
									player.choosePlayerCard(target, 'he', true, '获得' + get.translation(target) + '的一张牌');

									'step 5'
									if (result.bool) {
										player.gain(result.cards, target, 'giveAuto');
									}
								},
								ai: {
									order: 7,
									result: {
										target: function (player, target) {
											if (target.hasJudge('bingliang')) return -0.5;
											return -1.5;
										},
									},
								},
							},
							shipo: {
								audio: "ext:谋攻篇:2",
								trigger: {
									player: "phaseJieshuBegin",
								},
								direct: true,
								filter: function (event, player) {
									return game.hasPlayer(function (current) {
										if (current == player) return false;
										return current.hp < player.hp || current.hasJudge('bingliang');
									});
								},
								content: function () {
									'step 0'
									event.num = 0;
									var list = [];
									if (game.hasPlayer(function (current) {
										return current.hp < player.hp;
									})) list.push('选项一');
									if (game.hasPlayer(function (currentx) {
										return currentx != player && currentx.hasJudge('bingliang');
									})) list.push('选项二');
									list.push('cancel2');
									if (list.length <= 1) event.finish();
									player.chooseControl(list).set('prompt', '是否选择一类角色并发动【势迫】？').set('choiceList', [
										'体力值小于你的一名角色',
										'判定区中有【兵粮寸断】的所有其他角色',
									]).set('ai', function () {
										var numx = 0, num = 0;
										if (game.hasPlayer(function (current) {
											return get.attitude(player, current) < 0 && current.hp < player.hp;
										})) numx = 1;
										var list = game.filterPlayer(function (currentx) {
											return currentx != player && currentx.hasJudge('bingliang');
										});
										while (list.length) {
											var target = list.shift();
											var att = get.attitude(player, target);
											if (att > 0) num--;
											else num++;
										}
										if (numx == 0 && num <= 0) return 'cancel2';
										if (numx > num) return '选项一';
										return '选项二';
									});
									'step 1'
									if (result.control == '选项一') {
										player.chooseTarget('势迫：请选择一个目标', function (card, player, target) {
											return target.hp < player.hp;
										}).set('ai', function (target) {
											return -get.attitude(_status.event.player, target);
										});
									}
									else if (result.control == '选项二') {
										result.targets = game.filterPlayer(function (currentx) {
											return currentx != player && currentx.hasJudge('bingliang');
										});
									}
									else event.finish();
									'step 2'
									if (result.targets) {
										player.logSkill('shipo', result.targets);
										event.targets = result.targets;
									}
									else event.finish();
									'step 3'
									var next = game.createEvent('shipo', false);
									next.player = player;
									next.target = event.targets[num];
									next.setContent(lib.skill.shipo.contentx);
									if (event.num + 1 < event.targets.length) {
										event.num++;
										event.redo();
									}
									'step 4'
									if (player.countCards('h', function (card) {
										return card.hasGaintag('shipo');
									})) {
										player.chooseCardTarget({
											prompt: '势迫：是否将获得的任意张牌交给一名其他角色？',
											selectCard: [1, Infinity],
											filterCard: function (card) {
												return card.hasGaintag('shipo');
											},
											filterTarget: lib.filter.notMe,
											ai1: function (card) {
												return 0;
											},
											ai2: function (target) {
												return 0;
											},
										});
									}
									else event.finish();
									'step 5'
									player.removeGaintag('shipo');
									if (result.bool) {
										var cards = result.cards, target = result.targets[0];
										target.gain(cards, player, 'giveAuto');
									}
									else event.finish();
								},
								contentx: function () {
									'step 0'
									target.chooseCard('h', '交给' + get.translation(player) + '一张牌，或者受到一点伤害').set('ai', function (card) {
										return 10 - get.value(card);
									});
									'step 1'
									if (result.bool) player.gain(result.cards, target, 'giveAuto').gaintag.add('shipo');
									else target.damage();
									game.delay();
								},
							},
							mouyangwei: {
								audio: "ext:谋攻篇:2",
								enable: "phaseUse",
								usable: 1,
								filter: function (event, player) {
									return !player.hasSkill('mouyangwei_sha') && !player.hasSkill('mouyangwei2') && !player.hasSkill('mouyangwei3') && !player.hasSkill('mouyangwei4');
								},
								content: function () {
									player.draw(2);
									player.addTempSkill('mouyangwei_sha', 'phaseUseEnd');
									player.addSkill('mouyangwei2');
								},
								ai: {
									order: 10,
									result: {
										player: 1,
									},
								},
							},
							"mouyangwei2": {
								trigger: {
									player: "phaseAfter",
								},
								direct: true,
								content: function () {
									player.removeSkill('mouyangwei2');
									player.addSkill('mouyangwei3');
								},
							},
							"mouyangwei3": {
								trigger: {
									player: "phaseBefore",
								},
								direct: true,
								content: function () {
									player.removeSkill('mouyangwei3');
									player.addTempSkill('mouyangwei4');
								},
							},
							"mouyangwei_sha": {
								mark: true,
								marktext: "威",
								intro: {
									name: "威",
									content: "出【杀】次数+1，无距离限制，无视防具",
								},
								mod: {
									cardUsable: function (card, player, num) {
										if (card.name == 'sha') return num + 1;
									},
									attackFrom: function () {
										return -Infinity;
									},
								},
								trigger: {
									player: "useCardToPlayered",
								},
								filter: function (event, player) {
									return event.card.name == 'sha' && get.color(event.card) == 'black';
								},
								direct: true,
								content: function () {
									for (var i of trigger.targets) {
										i.addTempSkill('qinggang2');
										i.storage.qinggang2.add(trigger.card);
									}
								},
								ai: {
									"unequip_ai": true,
								},
							},
							mouyaowu: {
								trigger: {
									player: "damageBegin3",
								},
								audio: "ext:谋攻篇:2",
								forced: true,
								filter: function (event) {
									return event.card && (get.color(event.card) != 'red' || event.source && event.source.isAlive());
								},
								content: function () {
									trigger[get.color(trigger.card) != 'red' ? 'player' : 'source'].draw();
								},
							},
							"mouyangwei4": {
							},
							"mou_paoxiao": {
								audio: "ext:谋攻篇:2",
								forced: true,
								mod: {
									cardUsable: function (card, player, num) {
										if (card.name == 'sha') return Infinity;
									},
									targetInRange: function (card, player) {
										if (player.getEquip(1) && card.name == 'sha') return true;
									},
								},
								trigger: {
									player: "useCardToPlayered",
								},
								init: function (player) {
									player.storage.mou_paoxiao = false;
								},
								filter: function (event, player) {
									return (!event.audioed || !player.hasSkill('mou_paoxiao2')) && event.card.name == 'sha' && player.isPhaseUsing();
								},
								content: function () {
									'step 0'
									var history = player.getHistory('useCard', function (evt) {
										return evt.card.name == 'sha';
									});
									if (history.length < 2) event.finish();
									'step 1'
									var target = trigger.target;
									target.addTempSkill('fengyin');
									trigger.directHit.add(target);
									player.storage.mou_paoxiao = true;
									player.addTempSkill('mou_paoxiao2', { player: 'phaseUseAfter' })
									var id = target.playerid;
									var map = trigger.customArgs;
									if (!map[id]) map[id] = {};
									if (!map[id].extraDamage) map[id].extraDamage = 0;
									map[id].extraDamage++;
								},
							},
							"mou_paoxiao2": {
								charlotte: true,
								trigger: {
									source: "damageSource",
								},
								forced: true,
								popup: false,
								onremove: function (player) {
									player.storage.mou_paoxiao = false;
									delete player.storage.mou_paoxiao;
								},
								filter: function (event, player) {
									return event.card && event.card.name == 'sha' &&
										event.player.isAlive() && player.storage.mou_paoxiao == true && player.isPhaseUsing();
								},
								content: function () {
									player.loseHp();
									player.discard(player.getCards('h').randomGet());
								},
							},
							mouxieji: {
								audio: "ext:谋攻篇:2",
								init: function (player) {
									player.storage.mouxieji = [];
								},
								group: "mouxieji_hezuo",
								trigger: {
									player: "phaseZhunbeiBegin",
								},
								filter: function (event, player) {
									if (!player.storage.mouxieji) player.storage.mouxieji = [];
									return player.storage.mouxieji.length <= 1;
								},
								direct: true,
								content: function () {
									'step 0'
									player.chooseTarget(get.prompt('mouxieji'), '与一名其他角色协同作战', lib.filter.notMe).set('ai', function (target) {
										var player = _status.event.player;
										return get.attitude(player, target);
									});
									'step 1'
									if (result.bool) {
										var target = result.targets[0];
										player.logSkill('mouxieji', target);
										player.markAuto('mouxieji', [target]);
										player.addSkill('mouxieji_damage');
										target.addSkill('mouxieji_damage');
									}
								},
								intro: {
									content: "已与$协同作战",
								},
								subSkill: {
									hezuo: {
										audio: "ext:谋攻篇:mouxieji",
										trigger: {
											global: "phaseEnd",
										},
										filter: function (event, player) {
											return player.storage.mouxieji.contains(event.player);
										},
										forced: true,
										content: function () {
											player.unmarkAuto('mouxieji', [trigger.player]);
											var num1 = player.countMark('mouxieji_damage'), num2 = trigger.player.countMark('mouxieji_damage');
											player.removeSkill('mouxieji_damage');
											trigger.player.removeSkill('mouxieji_damage');
											if (num1 == num2) {
												player.popup('协击成功', 'wood');
												trigger.player.popup('协击成功', 'wood');
												game.log(player, '与', trigger.player, '协同作战成功');
												game.asyncDraw([trigger.player, player], 2);
												player.addTempSkill('mouxieji_sha', { player: 'phaseAfter' });
											}
											else {
												player.popup('协击失败', 'fire');
												trigger.player.popup('协击失败', 'fire');
												game.log(player, '与', trigger.player, '协同作战失败');
											}
										},
										sub: true,
									},
									damage: {
										intro: {
											content: "当前已造成#点伤害",
										},
										charlotte: true,
										onremove: true,
										trigger: {
											source: "damageSource",
										},
										filter: function (event, player) {
											return event.num > 0;
										},
										forstDo: true,
										priority: null,
										direct: true,
										content: function () {
											player.addMark('mouxieji_damage', trigger.num, false);
										},
										sub: true,
									},
									sha: {
										inherit: "zhongchi_sha",
										mark: false,
										trigger: {
											source: "damageBegin1",
										},
										sub: true,
										charlotte: true,
										intro: {
											content: "受到【杀】造成的伤害+1",
										},
										market: "斥",
										audio: "zhongchi",
										filter: function (event, player) {
											return event.card && event.card.name == 'sha';
										},
										forced: true,
										content: function () {
											trigger.num++;
										},
									},
								},
							},
							mouliangzhu: {
								audio: "ext:谋攻篇:2",
								groupSkill: true,
								enable: "phaseUse",
								usable: 1,
								filter: function (event, player) {
									return player.group == 'shu';
								},
								filterTarget: function (card, player, target) {
									return target.countCards('e') > 0 && target != player;
								},
								content: function () {
									'step 0'
									player.choosePlayerCard(target, true, 'e');
									'step 1'
									if (result.bool) {
										player.addToExpansion(result.cards, player, 'give').gaintag.add('mou_zhuang');
									} else event.finish();
									event.num = 0;
									'step 2'
									if (!game.players[event.num].isAlive()) event.goto(4);
									if (game.players[event.num].countMark('mou_zhu') > 0) {
										game.players[event.num].chooseControl().set('choiceList', [
											'回复1点体力',
											'摸一张牌',
										]);
									}
									else event.goto(4)
									'step 3'
									if (result.index == 0) game.players[event.num].recover();
									else game.players[event.num].draw();
									'step 4'
									event.num++;
									if (event.num < game.players.length) event.goto(2);
								},
								ai: {
									order: 10,
									result: {
										target: function (player, target) {
											var att = get.attitude(player, target);
											if (att < 0) return -att;
											var es = target.getCards('e');
											if (att < 0 && es.length > 0) {
												for (var i = 0; i < es.length; i++) {
													var val = get.equipValue(es[i], target);
													return val;
												}
												return -att * es.length;
											}
											if (att > 0 && es.length > 2) return 1;
											return 0;

										},
									},
								},
							},
							moufanxiang: {
								audio: "ext:谋攻篇:2",
								dutySkill: true,
								global: "mou_zhu",
								forced: true,
								trigger: {
									global: "gameDrawBegin",
								},
								content: function () {
									'step 0'
									if (player.group != 'shu') {
										player.changeGroup('shu');
									}
									// player.group = 'shu'; game.log(player, '变更势力为【蜀】');

									'step 1'
									player.chooseTarget(true, '选择一名角色令其获得“助”', lib.filter.notMe).set('ai', function (target) {
										var att = get.attitude(_status.event.player, target);
										if (att > 0) return 1 + att;
										return Math.random();
									});
									'step 2'
									if (result.bool) {
										var target = result.targets[0];
										// target.addskill('mou_zhu');
										target.addMark('mou_zhu', 1);
									}
								},
							},
							"mou_zhuang": {
								mark: true,
								marktext: "妆",
								charlotte: true,
								intro: {
									content: "expansion",
									markcount: "expansion",
								},
								onremove: function (player, skill) {
									var cards = player.getExpansions(skill);
									if (cards.length) player.loseToDiscardpile(cards);
								},
							},
							"mou_zhu": {
								mark: true,
								forced: true,
								marktext: "助",
								intro: {
									name: "助",
									content: "mark",
								},
								trigger: {
									global: "phaseUseBegin",
								},
								filter: function (event, player) {
									return player.countMark('mou_zhu') > 0 && event.player.hasSkill('moufanxiang');
								},
								content: function () {
									'step 0'

									if (!player.countCards('h')) {
										result.index = 1;
										event.goto(2);
									}
									'step 1'
									var str = get.translation(trigger.player);
									player.chooseControl().set('choiceList', [
										'交给' + str + '两张手牌（若其手牌不足两张则交给你所有手牌）',
										'令' + str + '使命失败',
									]).set('ai', function () {
										var attitude = get.attitude(player, trigger.player);
										if (attitude <= 0) return 1;
										else {
											if (trigger.player.countCards('e') > 2) return 1;
										}
										return 0;
									});
									'step 2'
									if (result.index == 0) {
										if (player.countCards('h') < 3) { trigger.player.gain(player.getCards('h'), player, 'giveAuto',); event.finish(); }
										else event.goto(3);
									}
									else {
										game.log(trigger.player, '使命失败');
										trigger.player.awakenSkill('moufanxiang');

										trigger.player.group = 'wu';
										game.log(trigger.player, '变更势力为【吴】');
										trigger.player.recover();
										trigger.player.gain(trigger.player.getExpansions('mou_zhuang'), 'gain2', 'fromStorage');
										trigger.player.unmarkSkill('mou_zhuang');
										for (var i = 0; i < game.players.length; i++) {
											if (!game.players[i].isAlive()) continue;
											if (game.players[i].countMark('mou_zhu') > 0) game.players[i].removeMark('mou_zhu', player.countMark('mou_zhu'));
										}
										trigger.player.loseMaxHp();
										event.finish();
									}
									'step 3'
									player.chooseCard('h', '交给两张手牌', 2, true).set('ai', function (card) {
										var attitude = get.attitude(player, trigger.player);
										if (attitude > 3) return 8 - get.value(card);
										else return 4 - get.value(card);

									});
									'step 4'
									if (result.bool) {
										game.log(result.cards);
										trigger.player.gain(result.cards, player, 'giveAuto');
									}
								},
							},
							mouxiaoji: {
								audio: "ext:谋攻篇:2",
								groupSkill: true,
								trigger: {
									player: "loseAfter",
									global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
								},
								frequent: true,
								filter: function (event, player) {
									var evt = event.getl(player);
									return player.group == 'wu' && evt && evt.player == player && evt.es && evt.es.length > 0;
								},
								content: function () {
									"step 0"
									event.count = trigger.getl(player).es.length;
									"step 1"
									event.count--;
									player.draw(2);
									player.chooseTarget(get.prompt('mouxiaoji'), '弃置场上一张牌', function (card, player, target) {
										return target.countDiscardableCards(player, 'hej');
									}).set('ai', function (target) {
										return -get.attitude(_status.event.player, target);
									});
									'step 2'
									if (result.bool) {
										player.discardPlayerCard(result.targets[0], 'hej', true);
									}
									"step 3"
									if (event.count) event.goto(1);
									// if(event.count>0){
									//     player.chooseBool(get.prompt2('mouxiaoji')).set('frequentSkill','mouxiaoji').ai=lib.filter.all;
									// }
									// "step 4"
									// if(result.bool){
									//     player.logSkill('mouxiaoji');
									//     event.goto(1);
									// }
								},
							}
						}
					};
					if (lib.device || lib.node) {
						for (var i in mougong.character) {
							mougong.character[i][4].push("ext:谋攻篇/" + i + ".jpg");
						}
					}
					else {
						for (var i in mougong.character) {
							mougong.character[i][4].push("db:extension-谋攻篇:" + i + ".jpg");
						}
					}
					return mougong;
				});
				game.import("card", function () {
					var mougong = {
						name: "mougong",
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
								image: 'ext:谋攻篇/xieli_tongchou.png',
							},
							xieli_bingjin: {
								fullimage: true,
								image: 'ext:谋攻篇/xieli_bingjin.png',
							},
							xieli_shucai: {
								fullimage: true,
								image: 'ext:谋攻篇/xieli_shucai.png'
							},
							xieli_luli: {
								fullimage: true,
								image: 'ext:谋攻篇/xieli_luli.png'
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
						list: []
					};
					for (var i in mougong.card) {
						mougong.card[i].image = ("ext:谋攻篇/" + i + ".png");
					}
					return mougong;
				});
				lib.config.all.characters.push("mougong");
				if (!lib.config.characters.contains("mougong")) lib.config.characters.push("mougong");
				lib.translate["mougong_character_config"] = "谋攻篇";
				lib.config.all.cards.push("mougong");
				if (!lib.config.cards.contains("mougong")) lib.config.cards.push("mougong");
				lib.translate["mougong_card_config"] = "谋攻篇";
			}
		}, help: {}, config: {}, package: {
			character: {
				character: {},
				translate: {}
			},
			card: {
				card: {},
				translate: {},
				list: []
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