var framework = { // Javascript 'namespace' syntax
	
	createShaderFromId: function (gl, shaderType, id)
	{
		var elemShader = document.getElementById(id);
		
		if (!elemShader)
		{
			alert("Could not locate " + id);
			return null;
		}
		
		var str = "";
		var node = elemShader.firstChild;
		
		while (node) 
		{
			if (node.nodeType == 3) // Text Node
			{
				str += node.textContent;
			}
			
			node = node.nextSibling;
		}
		
		
		return framework.createShader(gl, shaderType, str);
	},
	
	createShader: function(gl, shaderType, strShaderFile)
	{
		var shader = gl.createShader(shaderType);
		
		gl.shaderSource(shader, strShaderFile);
		
		gl.compileShader(shader);
		
		// In WebGL, replaces GlGetShaderiv
		var status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		
		if (status == false)
		{
			var infolog = gl.getShaderInfoLog(shader);
			
			var strShaderType = "";
			
			switch(shaderType)
			{
				case gl.VERTEX_SHADER: strShaderType = "vertex"; break;
				case gl.GEOMETRY_SHADER: strShaderType = "geometry"; break;
				case gl.FRAGMENT_SHADER: strShaderType = "fragment"; break;
			}
			
			alert("Compile failure in " + strShaderType + ": " + infolog);
		}
		
		return shader;
	},

	createProgram: function(gl, shaderList)
	{
		var program = gl.createProgram();
		
		for (var i = 0; i < shaderList.length; i++)
		{
			gl.attachShader(program, shaderList[i]);
		}
		
		gl.linkProgram(program);
		
		var status = gl.getProgramParameter(program, gl.LINK_STATUS);
		
		if (status == false)
		{
			var infolog = gl.getProgramInfoLog(program);
			
			alert("Linker failure: " + infolog);
		}
		
		
		return program;
	}
};