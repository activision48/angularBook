import {
    NgModule,
    Component
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

class Report {
    data: Array<string>;
    constructor(data: string[]){
        this.data = data;
    }
    run(){
        this.data.forEach(function(line){
            console.log(line);
        });
        this.data.forEach((line) => console.log('shorthand:'+line));
    }
}

class Article{
    title: string;
    link: string;
    votes: number;
    constructor(title: string, link: string, votes: number){
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    voteUp(): void {
        this.votes += 1;
    }

    voteDown(): void {
        this.votes -= 1;
    }
    domain(): string{
        try{
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        }catch(err){
            return null;
        }
    }
}
@Component({
    selector: 'article',
    templateUrl: './article.html',
    inputs:['article']
})
class ArticleComponent {
   
    article: Article;
    voteUp(): boolean {
        this.article.voteUp();
        return false;
    }

    voteDown(): boolean {
        this.article.voteDown();
        return false;
    }
}

@Component({
    selector: 'main-app',
    templateUrl: './main.html'
})
class MainApp {
    r: Report;

    articles: Article[];
    constructor() {
        this.articles =  [
            new Article("Title1","https://google.com",2),
            new Article("Title2","https://facebook.com",1),
            new Article("Title3","https://instagram.com",3),
        ];


        // this.r = new Report(['first line','second line']);
        // this.r.run();
        console.log(this.articles);
        //console.log(this.sorteArticles());

    }

    addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
        this.articles.push(new Article(title.value,link.value,0));
        title.value = '';
        link.value = '';
        return false;
    }
    sorteArticles(): Article[]{
        return this.articles.sort(
            function(a: Article, b: Article){
                return  b.votes - a.votes
            }
        );
    }
}

@NgModule({
    declarations: [
        MainApp,
        ArticleComponent
    ],
    imports: [BrowserModule],
    bootstrap: [MainApp]
})
class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);

