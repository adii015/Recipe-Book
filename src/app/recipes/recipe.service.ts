import { EventEmitter ,Injectable} from "@angular/core";
import { recipes } from "./recipes.model";
import { ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipeselected=new Subject<recipes>();
    // recipeselected=new EventEmitter<recipes>();

    private recipe:recipes[] =[
        new recipes(
          'Pav Bhaji',
          'Too Yummy with Extra butter',
          'data:image/jpeg;base64,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',
          [
            new ingredients('Pav',2),
            new ingredients('vegies',5)
          ]
          ),
          
          new recipes('Dosa ',
          'South indian special with extra cheese',
          'data:image/jpeg;base64,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',
          [
              new ingredients('maida',1),
              new ingredients('vegies',4)

          ])
  ];


   constructor(private shopinglistservice: ShoppingListService){}
      getrecipes(){
        return this.recipe.slice(); 
      }
      getrecipe(index:number){
        return this.recipe[index];
      }

      addingredienttoshoppinglist(ingredent:ingredients[]){
       this.shopinglistservice.addingredientss(ingredent);
      }
}