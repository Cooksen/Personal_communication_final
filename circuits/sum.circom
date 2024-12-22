

template Sum() {
	signal input a;
	signal input b;
	signal input c;
	signal output sum;

   // Declaration of signals.  


   // Constraints.  
   sum <== a * b - c;  
}

component main = Sum();