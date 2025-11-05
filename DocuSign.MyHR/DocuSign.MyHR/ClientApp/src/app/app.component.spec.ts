import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TranslateService } from '@ngx-translate/core'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

class TranslateServiceStub {
    public use() {}
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [RouterTestingModule],
    providers: [{ provide: TranslateService, useClass: TranslateServiceStub }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents()
    }))

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.componentInstance
        expect(app).toBeTruthy()
    })
})
