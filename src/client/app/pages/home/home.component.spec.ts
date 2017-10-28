import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { HttpRequest } from '../../shared/index';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent],
        providers: [
          { provide: HttpRequest, useValue: new MockHttpRequest() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHttpRequest =
              fixture.debugElement.injector.get<any>(HttpRequest) as MockHttpRequest;
            let HttpRequestSpy = spyOn(mockHttpRequest, 'get').and.callThrough();

            mockHttpRequest.returnValue = ['1', '2', '3'];

            fixture.detectChanges();

            expect(homeInstance.HttpRequest).toEqual(jasmine.any(MockHttpRequest));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
            expect(HttpRequestSpy.calls.count()).toBe(1);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));
  });
}

class MockHttpRequest {

  returnValue: string[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
