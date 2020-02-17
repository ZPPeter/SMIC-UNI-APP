import JBCS from '@/store/entities/jbcs';
export default class JDJLFM {
	constructor(id, dwmc, jdrq, dwdz, qjmc, xhgg, zzc, ccbh, jdyid,jdzt,sjdid,surname,yqjchrq,bzsm,jjwd, cjjd, qT01, qT02, qT03, qT04, qT05, jbcs) {
		this.id = id;
		this.dwmc = dwmc;
		this.jdrq = jdrq;
		this.dwdz = dwdz;
		this.qjmc = qjmc;
		this.xhgg = xhgg;
		this.zzc = zzc;
		this.ccbh = ccbh;
		this.cjjd = cjjd;
		this.jjwd = jjwd;		
		this.qT01 = qT01;
		this.qT02 = qT02;
		this.qT03 = qT03;
		this.qT04 = qT04;
		this.qT05 = qT05;
		this.jdyid = jdyid;
		this.jdzt = jdzt;
		this.sjdid = sjdid;
		this.surname = surname;
		this.yqjchrq = yqjchrq;
		this.bzsm = bzsm;
		//this.jbcs = jbcs;
		this.jbcs = new JBCS();
	}
}
/*

				id: this.o.id,
				dwmc: this.o.dwmc,
				jdrq: this.o.djrq,
				dwdz: '/',
				qjmc: this.o.qjmc,
				xhgg: this.o.xhggmc,
				zzc: this.o.zzcnr,
				ccbh: this.o.ccbh,
				jjwd: WQ[0],
				qT05: WQ[1],
				cjjd: this.o.jbcs.cjjd,
				qT01: this.o.jbcs.bcfw, // 3
				qT02: this.o.jbcs.bcjda,
				qT03: this.o.jbcs.bcjda,
				qT04: this.o.jbcs.axles
				
class Animal {
 constructor(name){ // 构造方法
  this.name = name
 }    
 sleep(){
  return 'zzZZ~'
 }
}
class Flyable extends Animal {
 constructor(name){
  super(name) // 执行父类构造方法
 }
 fly() {
  return 'flying...'
 }
}
// let cat = new Animal('cat');
*/
