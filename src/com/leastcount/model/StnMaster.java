package com.leastcount.model;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;


public class StnMaster {

	public static void main(String[] args) {
		
		
		String data = "CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WEST#SOUTH,TEX,TEXAS,SUPT OPNS - OKLAHOMA CITY#SOUTH,OTS,OTHER,FOREIGN#CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WEST#SOUTH,OTS,OTHER,FOREIGN#SOUTH,KAN,KANSAS,SUPT OPNS - AMARILLO#SOUTH,TEX,TEXAS,SUPT OPNS - OKLAHOMA CITY#CENTR,SPR,SPRINGFIELD,TERM SUPT - TULSA#SOUTH,OTS,OTHER,FOREIGN#CENTR,SPR,SPRINGFIELD,TERM SUPT - TULSA";
		//String data="CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WEST#CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WES#CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WEST#CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WES#CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WES#CENTR,SPR,SPRINGFIELD,SUPT OPNS - SPRINGFIELD WES";
		String [] dataArr = data.split("#");
		
		
		
	//	System.out.println("1g11 : "+dataArr[1]);
	//	System.out.println("gggg : "+new Gson().toJson(dataArr));
	//	Map divMap =null;
		//List role = null;
		//Map finMap = null;
		Map finMap = new HashMap();
	//	List divList = null;
		for (int k=0;k<dataArr.length;k++)
		{
			boolean flag = false;
			String str = dataArr[k];
		//	System.out.println("xxxvvv : "+str);
			String[] strRow = str.split(",");
			String key1=strRow[0];
			String key2="ShortDesc: "+strRow[1]+", LongDesc: "+strRow[2];
			String Key3=strRow[3];
			
			
			/*Map divMap = new HashMap();
			List role = new ArrayList();
			Map finMap = new HashMap();
			List divList = new ArrayList();
			*/
			
			if(finMap.containsKey(key1))
			{
				//get that key
				List tempList = (List)finMap.get(key1);
				int listSize = tempList.size();
				for(int i=0;i<listSize;i++)
				{
					Map tmpDivMap = (Map) tempList.get(i);
					if(tmpDivMap.containsKey(key2))
					{
						System.out.println("tmpDiVMap "+new Gson().toJson(tmpDivMap));
						System.out.println("inside tmpDivMap if at index i " +i);
						List tmpRoleList = (List) tmpDivMap.get(key2);
						if(!tmpRoleList.contains(Key3))
						{
							System.out.println("keu"+Key3);
							System.out.println("inside not equal tmproleList at index "+i);
							if(!tmpRoleList.contains(Key3)){
							tmpRoleList.add(Key3);
							}
							//finMap.put(key, value)
							//tmpDivMap.remove(key2);
							tmpDivMap.put(key2,tmpRoleList);
							System.out.println("before "+new Gson().toJson(tempList));
							tempList.remove(i);
							System.out.println("after "+new Gson().toJson(tempList));
							tempList.add(tmpDivMap);
							System.out.println("after add "+new Gson().toJson(tempList));
							//finMap.put(key1, tempList);
						}else{
							System.out.println("fuck you");
						}
					}
					else{
						System.out.println("inner else at index i "+i);
						List role = new ArrayList();
						if(!role.contains(Key3))
						role.add(Key3);
						Map divMap = new HashMap();
						divMap.put(key2, role);
						tempList.add(divMap);
						//finMap.put(key1, tempList);
						
					}
				}
				finMap.put(key1,tempList);
				
			}
			else{
				System.out.println("outer else at index k "+k);
				List role = new ArrayList();
				role.add(Key3);
				Map divMap = new HashMap();
				divMap.put(key2, role);
				List divList = new ArrayList();
				divList.add(divMap);
				finMap.put(key1, divList);
			}
				
			
			
		}
		
		System.out.println("FInal Map : "+new Gson().toJson(finMap));
	/*//
		List finRegList = new ArrayList();
		//now form final resp pattern from this finMap
		Set<Entry> entries = finMap.entrySet();
		for (Entry entry : entries) {
		//  System.out.println("vvvvv : "+ entry.getValue());
		 // System.out.println("kkkk : "+ entry.getKey());
		//  DivMapping divMapping = new DivMapping();
		  String json = new Gson().toJson(entry.getValue());
		 // divMapping.setDivision(entry.getValue().);
		  List list = new Gson().fromJson(json,List.class);
		  List divList = new ArrayList();
		  for(int i=0;i<list.size();i++)
		  {
			 Map str = (Map) list.get(i);
			 Set<Entry> strentries = str.entrySet();
				for (Entry strentry : strentries) {
					 System.out.println("vvvvv1 : "+ strentry.getValue());
				//	  System.out.println("kkkk1 : "+ strentry.getKey());
					DivMapping divMapping = new DivMapping();
					//String strKey =(String) strentry.getValue();
					divMapping.setDivision((String) strentry.getKey());
					divMapping.setRole((List) strentry.getValue());
					divList.add(divMapping);
					
				}
			 
		  }
		  //
			Map regMap = new HashMap();
		  regMap.put("Region", entry.getKey());
		  regMap.put("Division", divList);
		  finRegList.add(regMap);
		}
		
		Map finRegMap = new HashMap();
		finRegMap.put("ROWS", finRegList);
		System.out.println("FINAL RES : "+new Gson().toJson(finRegMap));
*/
	}

}
