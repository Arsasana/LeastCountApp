package com.leastcount.model;

import com.google.gson.Gson;

public class Test {

	enum Auto {FORD,BMW};
	
	public static void main(String[] args) {
	
		int a[][] = new int[4][];
		a[0] = new int[2];
		System.out.println(new Gson().toJson(a[0]));
		a[1] = new int[6];
		System.out.println(new Gson().toJson(a[1]));
		a[2] = new int[3];
		System.out.println(new Gson().toJson(a[2]));
		a[3] = new int[4];
		System.out.println(new Gson().toJson(a[3]));
		/*Auto a = null;
		String ans = "FoRd";
		ans = ans.toUpperCase();
		a = Auto.valueOf(ans);
		switch(a){
		case FORD:{
			System.out.println("ford");
		}
		}*/
		/*	if(args.length!=3){
			System.out.println("1");
			System.out.println("2");
		}else{
			
		
		int n = Integer.parseInt(args[0]);
		int []X = new int[n];
		int s = Integer.parseInt(args[1]);
		int i = Integer.parseInt(args[2]);
		System.out.println("List");
		for(String a : args)
		
		for(int k=0;k<n;k+=i){
			X[k]=s+i;
			System.out.printf("%8d\n",X[k]);
		}
	}*/
	}
}
