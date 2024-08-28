import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HousingLocationComponent } from './pages/housing-location/housing-location.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  fromEvent,
  interval,
  mapTo,
  merge,
  Observer,
  reduce,
  take,
  toArray,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgbModule,
    RouterOutlet,
    RouterLink,
    HomeComponent,
    HousingLocationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ng';
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // const observable = new Observable((subcriber) => {
    //   let i = 0;
    //   const interval = setInterval(() => {
    //     subcriber.next(++i);
    //   }, 1000);
    //   return () => {
    //     clearInterval(interval);
    //   };
    // });
    // const subcription = observable.subscribe((next) => console.log(next));
    // subcription.add(
    //   observable.subscribe((next) => console.log('children', next))
    // );
    // setTimeout(() => {
    //   subcription.unsubscribe();
    // }, 3000);
    /*
    OPERATORS
    */
    // ============================of
    // of([1, 2, 3], 'hello', { foo: 'bar' }).subscribe({
    //   next: (next) => console.log(next),
    //   error: (err) => console.log(err),
    //   complete: () => console.log('done'),
    // });
    // of thì ta phải dùng như này thì mới resolve được premise
    // of(Promise.resolve('done api')).subscribe({
    //   next: async (next) => {
    //     const res = await next;
    //     console.log('res', res);
    //   },
    //   error: (err) => console.log(err),
    //   complete: () => console.log('done'),
    // });
    // ============================from này là sẽ iterator từng phần tử
    // dùng from sẽ cho kết quả tương tự thay vì code như trên
    // from(Promise.resolve('done api')).subscribe({
    //   next: (next) => {
    //     console.log('next', next);
    //   },
    //   error: (err) => console.log(err),
    //   complete: () => console.log('done'),
    // });
    // from([
    //   {
    //     fullname: 'Phan Thang',
    //     age: 12,
    //   },
    // ]).subscribe({
    //   next: (next) => {
    //     console.log('next', next);
    //   },
    //   error: (err) => console.log(err),
    //   complete: () => console.log('done'),
    // });
    // ============================fromEvent
    // fromEvent(document, 'click').subscribe((next) => console.log(next));
    // formEventPattern : nâng cao hơn, tiện lợi hơn formEvent
    // fromEventPattern(
    //   (addHandler) => {
    //     document.addEventListener('click', (ev) =>
    //       console.log('ev', ev, addHandler(ev))
    //     );
    //   },
    //   (removeHandler) => {
    //     document.removeEventListener('click', (ev) => console.log(ev));
    //   },
    //   (result) => {
    //     console.log('transfrom result', +result.with * 1.1);
    //     return 'data này đã được biến đổi đầu ra';
    //   }
    // ).subscribe((next) => console.log('====next', next));
    // ============================interval: như tên gọi
    // const subcription = interval(2000).subscribe((next) =>
    //   console.log('next', next)
    // );
    // setTimeout(() => {
    //   subcription.unsubscribe();
    // }, 3000);
    // ============================timer: delay timer (giống setInterval nhưng sẽ cleartimer sau khi complete)
    // ============================throwError: chạy error và k complete
    // throwError('Có lỗi xảy ra').subscribe({
    //   next: (next) => {
    //     console.log(next);
    //   },
    //   error: (error) => console.log('err', error),
    //   complete: () => console.log('complete'),
    // });

    // defer

    // of luôn cho 1 đầu ra giống nhau
    // const subcriber1$ = of(Math.random());
    // subcriber1$.subscribe((next) => console.log(next));
    // subcriber1$.subscribe((next) => console.log(next));
    // subcriber1$.subscribe((next) => console.log(next));

    // defer thì dùng 1 factory để return ra 1 observable mới
    // const subcriber$ = defer(() => {
    //   return of(Math.random());
    // });

    // subcriber$.subscribe((next) => console.log(next));
    // subcriber$.subscribe((next) => console.log(next));
    // subcriber$.subscribe((next) => console.log(next));

    /*
    PIPE
    */

    interface IUser {
      id: string;
      username: string;
      firstname: string;
      lastname: string;
    }
    const users: IUser[] = [
      {
        id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
        username: 'tiepphan',
        firstname: 'tiep',
        lastname: 'phan',
      },
      {
        id: '34784716-019b-4868-86cd-02287e49c2d3',
        username: 'nartc',
        firstname: 'chau',
        lastname: 'tran',
      },
    ];

    const observer: Observer<IUser[]> = {
      next: (next: IUser[]) => {
        console.log('===next', next);
      },
      error: (err: any) => {
        console.log('===err', err);
      },
      complete: () => {
        console.log('===complete');
      },
    };

    //   of([1, 2, 3])
    //     .pipe(
    //       map((val, index) => {
    //         return val.map((v) => v * 10);
    //       })
    //     )
    //     .subscribe({
    //       next: (next) => {
    //         console.log('===next', next);
    //       },
    //       error: (err: any) => {
    //         console.log('===err', err);
    //       },
    //       complete: () => {
    //         console.log('===complete');
    //       },
    //     });
    // =================================================
    /* 
    // of: sử dụng mergeMap để nó phát ra từng obj riêng lẻ rồi pluck
    // hoặc dùng
    // from thì kết hợp với mỗi pluck là xong

    // output:
    ===next tiep
    ===next chau
    ===complete 
    */
    // of(users)
    //   .pipe(
    //     mergeMap((val) => val),
    //     pluck('firstname')
    //   )
    //   .subscribe({
    //     next: (next) => {
    //       console.log('===next', next);
    //     },
    //     error: (err: any) => {
    //       console.log('===err', err);
    //     },
    //     complete: () => {
    //       console.log('===complete');
    //     },
    //   });

    /* 
      mapTo => fixed 1 giá trị sau khi emit stream
    */
    // fromEvent(document, 'mouseleave')
    //   .pipe(mapTo(true))
    //   .subscribe({
    //     next: (next) => {
    //       console.log('===next', next);
    //     },
    //     error: (err: any) => {
    //       console.log('===err', err);
    //     },
    //     complete: () => {
    //       console.log('===complete');
    //     },
    //   });

    /* 
    scan
    scan<T, R>(accumulator: (acc: R, value: T, index: number) => R, seed?: T | R): OperatorFunction<T, R>
    Bây giờ mỗi lần stream emit một value, 
    bạn muốn apply một function lên value đó nhưng có sử dụng kèm theo kết quả lưu trữ trước đó (accumulator). 
    Các bạn có thể liên tưởng ngay đến hàm reduce của Array.
    */

    // fromEvent(document, 'click')
    //   .pipe(scan((acc, cur) => acc + 1, 0))
    //   .subscribe({
    //     next: (next) => {
    //       console.log('===next', next);
    //     },
    //     error: (err: any) => {
    //       console.log('===err', err);
    //     },
    //     complete: () => {
    //       console.log('===complete');
    //     },
    //   });

    /*
      // reduce khác scan ở chỗ là nó phải complete thì mới phát ra value cuối cùng
    */
    // fromEvent(document, 'click')
    //   .pipe(
    //     take(2),
    //     reduce((acc, cur) => {
    //       return acc + 1;
    //     }, 0),
    //     toArray() // colect toàn bộ các value emit thành 1 array
    //   )
    //   .subscribe({
    //     next: (next) => {
    //       console.log('===next', next);
    //     },
    //     error: (err: any) => {
    //       console.log('===err', err);
    //     },
    //     complete: () => {
    //       console.log('===complete');
    //     },
    //   });
    // from([1, 2, 3])
    //   .pipe(
    //     reduce((acc, cur) => {
    //       console.log('accc', acc);
    //       return acc + 1;
    //     }, 0)
    //   )
    //   .subscribe({
    //     next: (next) => {
    //       console.log('===next', next);
    //     },
    //     error: (err: any) => {
    //       console.log('===err', err);
    //     },
    //     complete: () => {
    //       console.log('===complete');
    //     },
    //   });

    /*  
      tức là thằng buffer này sẽ emit ra giá trị sau khi có 1 cái hiệu lệnh
      ví dụ: 1 emit đang chạy liên tục, chúng ta click 1 cái thì sẽ return emit đó ra
      dạng array rồi nó lại tiếp tục chạy rồi click lại return value array tiếp theo được emit
       sau khi  đã return lần trước đó
    */
    // const source$ = interval(1000);
    // const nofifier$ = fromEvent(document, 'click');

    // source$.pipe(buffer(nofifier$)).subscribe({
    //   next: (next) => {
    //     console.log('===next', next);
    //   },
    //   error: (err: any) => {
    //     console.log('===err', err);
    //   },
    //   complete: () => {
    //     console.log('===complete');
    //   },
    // });

    /* 
    debounceTime: emit value sau 1 time mong muốn 
    throttleTime: emit value tuần tự sau 1 time mong muốn
    */

    // fromEvent(document, 'click')
    //   .pipe(throttleTime(1500))
    //   .subscribe({
    //     next: (next) => {
    //       console.log('===next', next);
    //     },
    //     error: (err: any) => {
    //       console.log('===err', err);
    //     },
    //     complete: () => {
    //       console.log('===complete');
    //     },
    //   });

    /* 
      COMBINATION
     */

    // merge(
    //   interval(2000).pipe(mapTo('fixed value 1')),
    //   interval(1000).pipe(mapTo('fixed value 2'))
    // ).subscribe({
    //   next: (next) => {
    //     console.log('===next', next);
    //   },
    //   error: (err: any) => {
    //     console.log('===err', err);
    //   },
    //   complete: () => {
    //     console.log('===complete');
    //   },
    // });
  }
}
