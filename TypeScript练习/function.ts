namespace Func {
    function buildName(firstName: string, ...restOfName: string[]): string {
        return firstName + ' ' + restOfName.join(' ');
    }

    let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');

    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(52),
        createCardPicker: function (this) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
            }
        }
    };
}