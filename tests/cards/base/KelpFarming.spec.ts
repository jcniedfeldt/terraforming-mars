import {expect} from 'chai';
import {KelpFarming} from '../../../src/server/cards/base/KelpFarming';
import {TestPlayer} from '../../TestPlayer';
import {maxOutOceans} from '../../TestingUtils';
import {testGame} from '../../TestGame';

describe('KelpFarming', function() {
  let card: KelpFarming;
  let player: TestPlayer;

  beforeEach(function() {
    card = new KelpFarming();
    [/* skipped */, player] = testGame(2);
  });

  it('Can not play', function() {
    expect(player.canPlayIgnoringCost(card)).is.not.true;
  });

  it('Should play', function() {
    maxOutOceans(player, 6);
    expect(player.canPlayIgnoringCost(card)).is.true;

    const plantsCount = player.plants;
    card.play(player);
    expect(player.production.megacredits).to.eq(2);
    expect(player.production.plants).to.eq(3);
    expect(player.plants).to.eq(plantsCount + 2);

    expect(card.getVictoryPoints()).to.eq(1);
  });
});
