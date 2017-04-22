export class Card {
    name: string;
    title: string;
    description: string;
    color: string; // color is either: 'blue', 'green', 'red' or 'purple'
    imagePath: string; // path to the image
    id: number; // id of the card, this is useful only in the CurrentPlayer component, since


    // Build the imagePath on the component and assign it to a variable, then:
    // <img [src]="urlVariable" /> in the html file

    // Then to put the cards style into the appropriate component:
    // @Component({
    //     selector: 'some-component',
    //     template: '<div></div>',
    //     styleUrls: [
    //         'http://example.com/external.css',
    //         'app/local.css'
    //     ],
    //     encapsulation: ViewEncapsulation.None,
    // })
    // export class SomeComponent {}


    //TODO: define or remove image paths of the cards, depends on what we want to do.

    constructor(nameAndId: string) {

        let splittedFields = nameAndId.split('-');
        let name = splittedFields[0];
        this.id = Number(splittedFields[1]); //convert id string into storable number

        switch (name) {

            //GREEN CARDS: *********************************************************************************************
            case 'BURIAL_CHAMBER_DECORATION': {
                this.name = 'BURIAL_CHAMBER_DECORATION';
                this.title = 'Burial Chamber Decoration';
                this.color = "green";
                this.description = 'At End of Game: Earn 1 point per 3 stones in the burial chamber. (your own + others\' stones).';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'PYRAMID_DECORATION': {
                this.name = 'PYRAMID_DECORATION';
                this.title = 'Pyramid Decoration';
                this.color = "green";
                this.description = 'At End of Game: Earn 1 point per 3 stones in the pyramid. (your own + others\' stones).';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'TEMPLE_DECORATION': {
                this.name = 'TEMPLE_DECORATION';
                this.title = 'Temple Decoration';
                this.color = "green";
                this.description = 'At End of Game: Earn 1 point per 3 stones in the temple. (your own + others\' stones).';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'OBELISK_DECORATION': {
                this.name = 'OBELISK DECORATION';
                this.title = 'Obelisk Decoration';
                this.color = "green";
                this.description = 'At End of Game: Earn 1 point per 3 stones in the obelisk. (your own + others\' stones).';
                this.imagePath = 'not yet defined';
                break;
            }

            //BLUE CARDS: **********************************************************************************************
            case 'HAMMER': {
                this.name = 'HAMMER';
                this.title = 'Hammer';
                this.color = "blue";
                this.description = '1x Action: Excavate 3 stones from the quarry to your supply sled AND place 1 stone on 1 ship.';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'SAIL': {
                this.name = 'SAIL';
                this.title = 'Sail';
                this.color = "blue";
                this.description = '1x Action: Place 1 stone on 1 ship AND sail the ship to a site.';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'LEVER': {
                this.name = 'LEVER';
                this.title = 'Lever';
                this.color = "blue";
                this.description = '1x Action: Sail 1 ship to a site. Decide for yourself the order in which to unload the stones.';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'CHISEL': {
                this.name = 'CHISEL';
                this.title = 'Chisel';
                this.color = "blue";
                this.description = '1x Action: Place 2 stones on 1 ship OR place 1 stone on each of 2 ships.';
                this.imagePath = 'not yet defined';
                break;
            }

            //RED CARDS: ***********************************************************************************************
            case 'SARCOPHAGUS': {
                this.name = 'SARCOPHAGUS';
                this.title = 'Sarcophagus';
                this.color = "red";
                this.description = 'Immediately: Place 1 stone from the quarry in the burial chamber.';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'ENTRANCE': {
                this.name = 'ENTRANCE';
                this.title = 'Entrance';
                this.color = "red";
                this.description = 'Immediately; Place 1 stone from the quarry in the pyramid.';
                this.imagePath = 'not yet defined';
                break;
            }
            case 'PAVED_PATH': {
                this.name = 'PAVED_PATH';
                this.title = 'Paved Path';
                this.color = "red";
                this.description = 'Immediately: Place 1 stone from the quarry on your obelisk.';
                this.imagePath = 'not yet defined';
                break;
            }

            //PURPLE CARDS: ********************************************************************************************
            case 'STATUE': {
                this.name = 'STATUE';
                this.title = 'Statue';
                this.color = "purple";
                this.description = 'At End of Game: Number of statues';
                this.imagePath = 'not yet defined';
                break;
            }

            //PLACEHODER CARD: *****************************************************************************************
            case 'IS_TAKEN': {
                this.name = 'PLACEHOLDER';
                this.title = 'Not Available';
                this.color = "placeholder";
                this.description = 'This card has already been picked.';
                this.imagePath = 'not yet defined';
                break;
            }
        }
    }
}
